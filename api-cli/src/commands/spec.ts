import { Command } from '@oclif/command'
import * as fs from 'fs-extra'
// @ts-ignore
import * as niceTry from 'nice-try'
import * as path from 'path'
import {getUser} from '../lib/credentials'
import { getPaths } from '../Paths'
import { prepareEvents } from '../PersistUtils'
import * as express from 'express'
import * as getPort from 'get-port'
import bodyParser = require('body-parser')
import * as open from 'open'
import { readApiConfig } from './start';
import analytics from '../lib/analytics';
import Init, { IApiCliConfig } from './init';
interface IOpticDiffState {
  status: 'started' | 'persisted'
  interactionResults: Object
  acceptedInterpretations: any[]
}
interface IOpticRequestAdditions {
  session: Object
  diffState: IOpticDiffState
}
declare global {
  namespace Express {
    export interface Request {
      optic: IOpticRequestAdditions
    }
  }
}

function makeInitialDiffState(events: any[]): IOpticDiffState {
  return {
    status: 'started',
    interactionResults: {},
    acceptedInterpretations: [],
  }
}
export default class Spec extends Command {

  static description = 'Read the docs and design the API'

  static args = []

  async run() {
    const { specStorePath } = await getPaths()
    if (fs.existsSync(specStorePath)) {
      const events = niceTry(() => {
        const savedEvents = fs.readFileSync(specStorePath).toString()
        const parsedJson = JSON.parse(savedEvents)
        if (Array.isArray(parsedJson) && parsedJson.every(i => typeof i === 'object')) {
          return parsedJson
        }
      })
      if (!events) {
        return this.error('Invalid event persistence format. Check the file for any conflicts.')
      }
      return this.startServer(events)
    } else {
      return this.error("No API spec found in your working directory. Make sure you're in the directory with the .api folder.")
    }
  }

  async getSessions() {
    // find sessions and session state files
  }

  async getLatestSession() {

  }

  async startServer(initialEvents: any[]) {
    let config: IApiCliConfig;
    try {
      config = await readApiConfig()
    } catch (e) {
      analytics.track('api spec missing config')
      this.log(`[incomplete setup] Optic needs some more information to continue.`)
      await Init.run([])
      return
    }

    const { specStorePath, sessionsPath } = await getPaths()
    let events = initialEvents
    const sessionFileSuffix = '.optic_session.json';
    const diffStateFileSuffix = '.optic_diff-state.json'
    const app = express()
    app.use(bodyParser.text({ type: 'text/html', limit: '100MB' }))
    const port = await getPort({ port: getPort.makeRange(3201, 3299) })

    app.get('/cli-api/events', (req, res) => {
      console.log('get events')
      res.json(events)
    })
    app.get('/cli-api/identity', async (req, res) => {
      res.json({distinctId: await getUser() || 'anon'})
    })
    app.put('/cli-api/events', bodyParser.json(), async (req, res) => {
      const newEvents = req.body
      await fs.writeFile(specStorePath, prepareEvents(newEvents))
      events = newEvents
      res.sendStatus(204)
    })

    app.get('/cli-api/sessions', async (req, res) => {
      const entries = await fs.readdir(sessionsPath)
      const sessions = entries
        .filter(x => x.endsWith(sessionFileSuffix))
        .map(x => x.substring(0, x.length - sessionFileSuffix.length))
        .sort((a, b) => {
          return b.localeCompare(a)
        })

      res.json({
        sessions
      })
    })

    async function validateSessionId(req: express.Request, res: express.Response, next: express.NextFunction) {

      const entries = await fs.readdir(sessionsPath)
      const { sessionId } = req.params;
      const sessionFileName = `${sessionId}${sessionFileSuffix}`
      if (!entries.includes(sessionFileName)) {
        return res.status(400).json({
          message: 'invalid session id'
        })
      }

      const diffStateFileName = `${sessionId}${diffStateFileSuffix}`
      const diffStateFilePath = path.join(sessionsPath, diffStateFileName)
      const diffStateExists = await fs.pathExists(diffStateFilePath)

      try {
        const diffState = diffStateExists ? await fs.readJson(diffStateFilePath) : makeInitialDiffState(events)
        const session = await fs.readJson(path.join(sessionsPath, sessionFileName))
        req.optic = {
          session,
          diffState
        }
        next()
      } catch (e) {
        console.error(e);
        next(e)
      }
    }

    app.get('/cli-api/sessions/:sessionId', validateSessionId, async (req, res) => {
      const { optic } = req;
      const { session } = optic;
      const hostname = require('url').parse(config.proxy.target).hostname
      console.log(hostname);
      res.json({
        hostname,
        session
      })
    })

    app.put('/cli-api/sessions/:sessionId/diff', bodyParser.json(), validateSessionId, async (req, res) => {
      const { sessionId } = req.params;
      const diffStateFileName = `${sessionId}${diffStateFileSuffix}`
      const diffStateFilePath = path.join(sessionsPath, diffStateFileName)
      console.log(req.body)
      await fs.writeJson(diffStateFilePath, req.body)
      res.sendStatus(204)
    })

    app.get('/cli-api/sessions/:sessionId/diff', validateSessionId, (req, res) => {
      const { optic } = req;
      const { diffState } = optic;
      res.json({
        diffState
      })
    })

    app.use(express.static(path.join(__dirname, '../../resources/react')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../resources/react/', 'index.html'))
    })

    await app.listen(port)
    const url = `http://localhost:${port}/`
    this.log('opening api spec on ' + url)
    this.log('keep this process running...')
    await open(url)
  }
}
/*
- sessions are saved in .api/sessions folder
- *.optic_session.json
- find latest one
- load *.optic_diff-state.json
*/

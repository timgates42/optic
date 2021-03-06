import Command from '@oclif/command';
import path from 'path';
import { basePath, runStandaloneScript } from '@useoptic/cli-scripts';

export default class TestNotification extends Command {
  static description = 'Test notifications';
  static hidden = true;

  async run() {
    const notifyScriptPath = path.resolve(basePath, 'notify');
    const iconPath = path.join(__dirname, '../../../assets/optic-logo-png.png');

    // console.log({ basePath, notifyScriptPath });
    runStandaloneScript(
      notifyScriptPath,
      'https://www.useoptic.com/docs',
      iconPath
    );
  }
}

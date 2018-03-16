import sbt._
import Keys._

object Dependencies {

  val sharedDependencies : Seq[ModuleID] = Seq(
    //tests
    "org.scalactic" %% "scalactic" % "3.0.1",
    "org.scalatest" %% "scalatest" % "3.0.1" % "test",

    "com.opticdev" %% "parser-foundation" % "0.1.1",

    //file library
    "com.github.pathikrit" % "better-files_2.12" % "2.17.1",
    "com.github.pathikrit" %% "better-files-akka" % "2.17.1",

    //logging
    "org.slf4j" % "slf4j-simple" % "1.7.25" % "test",

    //graph
    "org.scala-graph" %% "graph-core" % "1.12.3"
  )

  val commonDependencies: Seq[ModuleID] = Seq(
    "org.apache.commons" % "commons-lang3" % "3.6",
    "com.github.pathikrit" % "better-files_2.12" % "2.17.1",
    "com.typesafe.play" %% "play-json" % "2.6.2",
    "org.scalactic" %% "scalactic" % "3.0.1",
    "org.scalatest" %% "scalatest" % "3.0.1" % "test"
  )

  val sdkDependencies: Seq[ModuleID] = sharedDependencies ++ Seq(
    "com.typesafe.play" %% "play-json" % "2.6.2",
    "com.github.fge" % "json-schema-validator" % "2.2.6",
    "org.gnieh" %% "diffson-play-json" % "2.2.1",
    "org.apache.commons" % "commons-compress" % "1.16.1"
  )

  val serverDependencies : Seq[ModuleID] = sharedDependencies ++ Seq(
    "com.typesafe.akka" %% "akka-http" % "10.0.10",
    "com.typesafe.akka" %% "akka-http-testkit" % "10.0.10",
    "com.typesafe.akka" %% "akka-http-jackson" % "10.0.10",
    "de.heikoseeberger" %% "akka-http-play-json" % "1.19.0-M2",

    "com.typesafe.play" %% "play-json" % "2.6.2",
    "com.github.fge" % "json-schema-validator" % "2.2.6",
    "org.gnieh" %% "diffson-play-json" % "2.2.1",

    //for concurrency
    "com.typesafe.akka" %% "akka-actor" % "2.5.4",
    "com.typesafe.akka" %% "akka-stream" % "2.5.4",

    "org.awaitility" % "awaitility-scala" % "3.0.0",

    "com.typesafe.play" %% "play-ws-standalone" % "1.1.3",
    "com.typesafe.play" %% "play-ahc-ws-standalone" % "1.1.2",
    "com.typesafe.play" %% "play-ws-standalone-json" % "1.1.2",

    "com.mixpanel" % "mixpanel-java" % "1.4.4"
  )

  val coreDependencies : Seq[ModuleID] = sharedDependencies ++ Seq(
    "com.typesafe.play" %% "play-json" % "2.6.2",
    "com.github.fge" % "json-schema-validator" % "2.2.6",
    "org.gnieh" %% "diffson-play-json" % "2.2.1",

    "commons-io" % "commons-io" % "2.4",
    "io.suzaku" %% "boopickle" % "1.2.6",

    "com.typesafe.akka" %% "akka-http" % "10.0.10",
    "com.typesafe.akka" %% "akka-http-testkit" % "10.0.10",
    "com.typesafe.akka" %% "akka-http-jackson" % "10.0.10",
    "de.heikoseeberger" %% "akka-http-play-json" % "1.19.0-M2",
    "ch.megard" %% "akka-http-cors" % "0.2.2",

    //for concurrency
    "com.typesafe.akka" %% "akka-actor" % "2.5.4",
    "com.typesafe.akka" %% "akka-stream" % "2.5.4",

    "net.jcazevedo" %% "moultingyaml" % "0.4.0",
    "com.opticdev" %% "marvin-runtime" % "0.1.0",
    "com.opticdev" %% "marvin-common" % "0.1.0"
  )

  val arrowDependencies : Seq[ModuleID] = sharedDependencies ++ Seq(
    "me.xdrop" % "fuzzywuzzy" % "1.1.9",
    "com.opticdev" %% "marvin-runtime" % "0.1.0",
    "com.opticdev" %% "marvin-common" % "0.1.0"
  )

  val opmDependencies : Seq[ModuleID] = sharedDependencies ++ Seq(
    "com.vdurmont" % "semver4j" % "2.1.0",
    "net.jcazevedo" %% "moultingyaml" % "0.4.0",
    "com.typesafe.play" %% "play-json" % "2.6.2",
    "com.typesafe.play" %% "play-ws-standalone" % "1.1.3",
    "com.typesafe.play" %% "play-ahc-ws-standalone" % "1.1.2",
    "com.typesafe.play" %% "play-ws-standalone-json" % "1.1.2",
    "com.opticdev" %% "marvin-runtime" % "0.1.0",
    "com.opticdev" %% "marvin-common" % "0.1.0"
  )

}




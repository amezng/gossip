# akka-chat
Chat app built using play framework, akka and websocket.

## Installation
Create the clone of the project using git command.
```bash
 git clone https://github.com/amezng/akka-chat.git
 cd akka-chat
```
Now, build and run the project using sbt
```bash
$ sbt run
[info] Loading project definition from /path/akka-chat/project
[info] Set current project to akka-chat (in build file:/path/akka-chat/)
[info] Updating {file:/D:/scala/akka-chat/}root...
[info] Resolving org.scala-lang#scala-library;2.11.7 ...
[info] Resolving com.typesafe.play#twirl-api_2.11;1.1.1 ...
[info] Resolving org.apache.commons#commons-lang3;3.4 ...
[info] Resolving org.scala-lang.modules#scala-xml_2.11;1.0.1 ...
....
[info] Done updating.

--- (Running the application, auto-reloading is enabled) ---

[info] p.c.s.NettyServer - Listening for HTTP on /0:0:0:0:0:0:0:0:9000

```
Now, open 2 different browsers and visit http://localhost:9000/chat .

### Simple Features
 * Generates names and font colors in a random fashion.
 * Automatically detects and notifies when new users log in from different browser.
 * Automatically kills the session if the browser is closed.
 

If you're lucky then you would see the following ;)

![Chat snapshot](public/img/snapshot.PNG?raw=true "Chat Snapshot")




## GMinions

Commands as background jobs.

### Description

```
                 +--------------------+
                 |                    |
     +-----------+    APPLICATION     <------------+
     |           |                    |            |
     |           +--------------------+            |
     |                                             |
     |                                             |
+----v----+         +-------------+           +----v----+
|         |  type   |             | transport |  Queue  |
|  Event  +--------->  Event Bus  +----------->    -    <---------------+
|         |         |             |           |  Router |               |
+---------+         +-------------+           +----+----+               |
                                                   |                    |
                                                   |                    |
                                                   |                    |
                    +-----------+    req    +------v--------+           |
                    |           <-----------+               | transport |
                    |  Command  |           |  Command Bus  +-----------+        
                    |           +----------->               |
                    +-----------+    res    +---------------+
```


Three components:
- Distributed Events
- Event -> Command dispatcher
- Background Commands

#### Distributed Events
Single interface for Pub/Sub across multiple applications, processes, and protocols. Protocols are handled by the transport layer.
A transport layer focuses in how to implement the pub/sub interface in a given protocol such as MQTT, or WS.

#### Event Command Dispatcher
Mechanics to tie the execution of a particular command after a given Event. Dispatch an event, trigger a command.  

#### Background Command
Execute a command as a separate thread/process. (Should it be a detached process?)
We should be able to execute a command both inside an application and as a separate process.
This requires a command runner that will provide the context for the command.

### Bus Types

* EventDispatcher
* Process Runner
* IPC Local (inter-process) communication transport.
* MQTT
* Redis
* AMQP
* SocketIO


We want to be able use a single mechanism to generate Events to execute Commands in a distributed infrastructure.

An Event can have a `transport` property which will determine which EventBus will be used for the dispatch.

EventBus will handle the `transport.req` property by selecting the right transport.
CommandBus will handle the `transport.res`.

An Event/Command flow can optionally generate a response. If set transport to be an object with `req` and `res` values it will generate a response using the

Browser (Event) -> Server (EventBus) -> Queue:Router -> CommandBus -> Command

Event:

```js
{
    type: 'EventType',
    id: 'j57lpaiw-1xk1n62cde7',
    transport: 'exec',
    transport: {
        req: 'exec',
        res: 'mqtt'
    },
    payload: {}
}
```


### EventHub

We can have a single interface to emit events over different transports.
- mqtt.js: browser, devices, server.

NOTES: We probably want to make semantics different from regular EventEmitter. Replace emit/on, use pub/sub
Make an EventDispatcher that extends EventEmitter and implements pattern matching. We can use the same as MQTT. We could also add Promises?

Q: Are two events delivered over two different transports that have the same topic the same type of event?
This matters if we need to specify our listeners registering the command. If the command should be the same independently of the transport or not.

Node A:
```js
let hub = new EventHub({
    transports: {
        ws: require('event-hub-transport-ws'),
        mqtt: require('event-hub-transport-mqtt'),
    }
});

hub.pub({
    type: 'ww/readers/2313131/update',
    transport: 'mqtt',
    payload: {
        bin: '01000101110010101000101010001010',
        ts: 1500494030017
    }
});
```

Node B:
```js
let hub = new EventHub({
    transports: {
        ws: require('event-hub-transport-ws'),
        mqtt: require('event-hub-transport-mqtt'),
    },
    defaultTransport: 'mqtt'
});

hub.sub({
    type: 'ww/readers/#/update',
    transport: ['mqtt', 'ws']
}, (event)=>{

hub.sub('ww/readers/#/update', (event)=>{

});
```


```js
let hub = new EventHub({
    transports: {
        ws: require('event-hub-transport-ws')({url:'https://ws.myserver.io'}),
        mqtt: require('event-hub-transport-mqtt')({
            url: 'mqtt://user:pass@myserver.io:90303'
        }),
    },
    defaultTransport: 'mqtt',
});

let commander = new CommandBus({
    dispatcher: hub
});

commander.registerCommand('ww/readers/#/update', ReaderUpdateCommand);

//If we want to explicitly wrap a command as a background job
commander.registerCommand('ww/readers/#/update', new BackgroundCommand(ReaderUpdateCommand));

/*
 * We can specify a list of options
 * registering a command:
 * type
 * transport
 * runner
 */
commander.registerCommand({
    type: 'ww/readers/#/access/granted',
    transport: 'mqtt',
}, ReaderAccessGrantedCommand);
```

TODO: Codify how we do req/res in the flow!!!!
How do we know to which topic to respond?
How do we know what transport we use for the response?

```js
class CommandBus {

    registerCommand(type, handler){
        this.hub.sub(type, (event) => {
            event.context = this.context;
            //Create response id
            if(!event.res) event.res = {};
            event.receivedAt = this.getTimestamp();
            event.res.id = this.getUid();
            // event.res.from = type;

            // let command = this.getCommandByMatchingTopic(type);
            // if(!command) throw new HandlerError('Command not registered');

            if(type.once) this.hub.unsubscribe(type, handler);

            let out = this.executeCommand(event, handler);
            Promise.resolve(out).then((result)=>{
                if(event.transport.res) {
                    this.hub.pub(event.res.type, result);
                }
            })
        });
    }
}

### Request Response
Similar but unlike HTTP req/res. Is it totally necessary?  

We could add a resolve/reject to the event, a progress method

Event {
    reject(err){}
    resolve(result){}
    progress(percent){}
}

### Topic Interops

Unified topic syntax:
`.` vs `/` topic level separators

NATS patterns:
* `foo.*.baz`: `*` matches any token, at any level of the subject.
* `foo.>`: `>` matches any length of the tail of a subject, and can only be the last token.
(NATS supports request reply)

MQTT patterns:
* `foo/+/baz`: single level wildcard, only covers one topic level
* `foo/#`: multilevel level wildcard, is always the last character in the topic and it is preceded by a forward slash
(topics that start with a $ are reserved for internal statistics of the MQTT broker)

AMQP patterns:
* `foo.*.baz`: `*` can substitute for exactly one word.
* `foo.#`:  can substitute for zero or more words.
    * `foo.#.bar`: Wildcard does not have to be last character

Redis patterns (glob `*, ?, []`):
* `PSUBSCRIBE foo.*`:

Socket.io/WebSockets
We can use routes to simulate the patterns in other transports.


Route matcher: topic -> route(?) -> handler
Multi handler

## Protocols in the Browser

* WebSockets
    * MQTT
    * NATS

https://www.npmjs.com/package/pattern-emitter
https://www.npmjs.com/package/pattern-emitter-promise
https://www.npmjs.com/package/mqtt-emitter


mqtt patterns:
https://github.com/RangerMauve/mqtt-pattern
### Getting Started

```
$ npm i gminions
```

## License

® License MIT 2017 by goliatone

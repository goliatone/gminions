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

### Bus Types

* EventDispatcher
* Process Runner
* IPC multi core applications
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
```
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

```js
let dispatcher = new EventHub(config);

dispatcher.sub({
    type: 'ww/readers/#/update',
    transport: ['mqtt', 'ws']
}, (event)=>{

});

dispatcher.pub({
    type: 'ww/readers/2313131/update',
    transport: 'mqtt',
    payload: {}
});
```

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
    * `foo.#.bar`:


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

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

Make an EventDispatcher that extends EventEmitter and implements pattern matching. We can use the same as MQTT.

https://www.npmjs.com/package/pattern-emitter

https://www.npmjs.com/package/mqtt-emitter

### Getting Started

```
$ npm i gminions
```

## License

® License MIT 2017 by goliatone

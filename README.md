## GMinions

Commands as background jobs.

### Description

```
+---------+         +-------------+          +---------+
|         |         |             |          |  Queue  |
|  Event  +--------->  Event Bus  +---------->    -    <------------+
|         |         |             |          |  Router |            |
+---------+         +-------------+          +----+----+            |
                                                  |                 |
                                                  |                 |
                                                  |                 |
                    +-----------+          +------v--------+        |
                    |           <----------+               |        |
                    |  Command  |          |  Command Bus  |        |
                    |           +---------->               +--------+
                    +-----------+          +---------------+
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

### Getting Started

```
$ npm i gminions
```

## License

® License MIT 2017 by goliatone

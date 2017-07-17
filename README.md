## GMinions

Commands as background jobs.

### Description

```
+---------+         +-------------+          +---------+
|         |         |             |          |         |
|  Event  +--------->  Event Bus  +---------->  Queue  |
|         |         |             |          |         |
+---------+         +-------------+          +----+----+
                                                  |
                                                  |
                                                  |
                    +-----------+          +------v--------+
                    |           <----------+               |
                    |  Command  |          |  Command Bus  |
                    |           +---------->               |
                    +-----------+          +---------------+
```

Bus Types
* EventDispatcher
* IPC multi core applications
* MQTT
* Redis
* AMQP
* SocketIO


We want to be able use a single mechanism to generate Events to execute Commands in a distributed infrastructure.

Browser (Event) -> Server (EventBus) -> Queue:Router -> CommandBus -> Command

Event:
```
{
    type: 'EventType',
    id: 'j57lpaiw-1xk1n62cde7',
    transport: 'amqp',
    transport: {
        req:'amqp',
        res:'ws'
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

## Request Response Pattern

Events that specify a `replyTo` attribute specify that the receiver handler should respond with any result to the given topic.


```js
{
    type: 'app.run',
    id: 'j57lpaiw-1xk1n62cde7',
    transport: ['mqtt', 'amqp'],
    replyTo: {
        mqtt: 'app.run.${event.id}.complete',
    },
    payload: {}
};
```

Things to consider in a reply:
We could have multiple listeners registered to a topic which could potentially reply to an Event. Thus we can have two types of responses:
- accumulative
- first response



Note:
Transport types:
In-Process (INPROC): Local (in-process) communication transport.
Inter-Process (IPC): Local (inter-process) communication transport.


Provide Event facilities to do:
Forwarder
Queue
Persistence


/// How to have a browser client register event listeners to server side events?
```js
let core = new EventHub.IO();
core.on('ww.reader.#.update', (event)=>{

});

core.emit('ww.lockers.open', {

});

class CoreIO {
    on(topic){
        this.io.emit('client.register', {
            clientId: this.id,
            topic: topic
        });
    }
}
```

```js
class BrowserClient {

}

dispatcher.on({
    type: 'client.register',
    transport: 'ws'
}, browserClient.forward.bind(browserClient));
```

https://appendto.com/2013/04/request-response-pattern-in-postal-js/


### WebSockets
Most transports rely on having a remote service provider. MQTT accepts an URL, same with AMQP. Why Should WS be different?
We might need the ability to broadcast messages, which might not be possible with a ws client, we might need the ws server.

pub/sub over ws


NOTE: Currently there is no way to guaranty a 1:1 delivery, since many subscribers can listen for a given topic (since we support wildcards). Do we want to make this behaviour different?

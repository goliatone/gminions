'use strict';
///////////////////
const EventHub = require('../lib/events/EventBus');
const TransportManager = require('../lib/transports/transportManager');
const MqttTransport = require('../lib/transports/mqtt');

let app = {name: 'TestApp'};

let manager = new TransportManager({
    defaultTransport: 'mqtt'
});

let dis = new EventHub({
    transport: manager,
    context: app
});

/////////////////////////////

const http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/public/index.html');

// Send index.html to all requests
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
const io = require('socket.io').listen(server);


io.on('connection', function(socket) {
    console.log('socket connected', socket.id);

    socket.on('core.client.subscribe', (event)=>{
        console.log('core.client.subscribe', event);
        dis.subscribe({
            type: event.type
        }, (event)=>{
            console.log('Forward: %j', event);
            socket.emit('core.client.message', event);
        });
    });

    //how do we know from the browser which transport
    //to use? Do we even have to specify?
    socket.on('core.client.publish', (event)=>{
        //we need to unwrap the message:
        dis.publish({
            uid: event.uid,
            type: event.type,
            payload: event.payload
        });

        if(event.replyTo) {

        }
    });
});

server.listen(3000);

console.log('Server runniong on http://localhost:3000');

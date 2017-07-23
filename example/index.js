'use strict';

const EventHub = require('../lib/events/EventBus');

const Event = require('../lib/events/Event');
const Command = require('../lib/commands/Command');
const EventTransport = require('../lib/transports/emitter');
const MqttTransport = require('../lib/transports/mqtt');
const TransportManager = require('../lib/transports/transportManager');

let app = {name: 'TestApp'};

let manager = new TransportManager();
manager.add('mqtt', new MqttTransport());
manager.add('emitter', new EventTransport());
manager.setDefault('emitter');

let dis = new EventHub({
    transport: manager,
    // transport: new EventTransport(),
//     transports: {
//         mqtt: new MqttTransport(),
//         default: new EventDispatcher()
//     },
// let dis = new MqttTransport({
// let dis = new EventDispatcher({
    context: app
});

dis.subscribe({
    once: true,
    type: 'app.+.post'
}, (event)=>{
    console.log('† Only once subscriber: %j', event);
});

dis.subscribe('app.*', (event)=>{
    console.log('√ subscriber: %j', event);
});

dis.publish({
    type: 'app.run.pre',
    transport: ['emitter', 'mqtt'],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run',
    transport: ['emitter', 'mqtt'],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run.post',
    transport: ['emitter', 'mqtt'],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run.post',
    transport: ['emitter', 'mqtt'],
    message: {
        age: 1
    }
});

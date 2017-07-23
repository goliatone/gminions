'use strict';

const EventHub = require('../lib/events/EventBus');

const Event = require('../lib/events/Event');
const Command = require('../lib/commands/Command');
const EventTransport = require('../lib/transports/emitter');
const MqttTransport = require('../lib/transports/mqtt');
const TransportManager = require('../lib/transports/transportManager');

let app = {name: 'TestApp'};

let manager = new TransportManager({
    transports: []
});

let dis = new EventHub({
    transport: manager,
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
    transport: [EventTransport.ID, MqttTransport.ID],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run',
    transport: [EventTransport.ID, MqttTransport.ID],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run.post',
    transport: [EventTransport.ID, MqttTransport.ID],
    message: {
        age: 1
    }
});

dis.publish({
    type: 'app.run.post',
    transport: [EventTransport.ID, MqttTransport.ID],
    message: {
        age: 1
    }
});

'use strict';

const EventHub = require('../lib/events/EventBus');
const TransportManager = require('../lib/transports/transportManager');

let app = {name: 'TestApp'};

let manager = new TransportManager({
    defaultTransport: 'mqtt'
});

let dis = new EventHub({
    transport: manager,
    context: app
});

dis.subscribe({
    once: true,
    type: 'app.+.post',
    // transport: ['mqtt'],
}, (event)=>{
    console.log('† Only once subscriber: %j', event);
});

dis.subscribe('app.*', (event)=>{
    console.log('√ subscriber: %j', event);
});

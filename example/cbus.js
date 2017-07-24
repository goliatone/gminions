'use strict';

const EventHub = require('../lib/events/EventBus');

const Event = require('../lib/events/Event');
const Command = require('../lib/commands/Command');
const CommandBus = require('../lib/commands/CommandBus');
const EventTransport = require('../lib/transports/emitter');
const MqttTransport = require('../lib/transports/mqtt');
const TransportManager = require('../lib/transports/transportManager');

class AppRunCommand extends Command{
    execute(event){
        console.log('AppRunCommand: %j', event);
    }
}

class PostRunCommand extends Command{
    execute(event){
        console.log('PostRunCommand: %j', event);
    }
}

let dis = new EventHub({
    transport: new TransportManager({
        defaultTransport: 'mqtt'
    }),
    context: {
        name: 'TestApp'
    }
});

let command = new CommandBus({
    eventBus: dis
});

command.add('app.run', AppRunCommand);
command.add('app.run.+', PostRunCommand);

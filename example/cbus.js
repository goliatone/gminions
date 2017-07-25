'use strict';

const EventHub = require('../lib/events/EventBus');

const Event = require('../lib/events/Event');
const Command = require('../lib/commands/Command');
const BackgroundCommand = require('../lib/commands/BackgroundCommand');

const CommandBus = require('../lib/commands/CommandBus');
const EventTransport = require('../lib/transports/emitter');
const MqttTransport = require('../lib/transports/mqtt');
const TransportManager = require('../lib/transports/transportManager');

class AppRunCommand extends Command {
    execute(event){
        console.log('[%s] %s AppRunCommand:   \t', getTime(), event.uid, event.type);
    }
}

class PrePostCommand extends Command {
    execute(event){
        console.log('[%s] %s PrePostCommand:  \t', getTime(), event.uid, event.type);
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

command.add('app.run', new BackgroundCommand({
    commandsPath: './example',
    runner: 'runner.js'
}));

command.add('app.run', function FunctionCommand(event){
    console.log('[%s] %s FunctionCommand: \t', getTime(), event.uid, event.type);
});


command.add('app.run.+', PrePostCommand);

function getTime(){
    return new Date().toLocaleTimeString();
}

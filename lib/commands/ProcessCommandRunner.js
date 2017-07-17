'use strict';
const path = require('path');
const CommandRunner = require('./CommandRunner');

class ProcessCommandRunner extends CommandRunner {

    init(options){
        this.commandsPath = './example';
    }

    run(event={}) {

        event = this.deserializeEvent(event);
        let command = this.loadCommand(event);

        return command(event).then((result)=>{
            event.result = result;
            return event;
        }).catch((err)=>{
            event.error = err;
            return event;
        });
    }

    loadCommand(event){
        let commandsPath = this.commandsPath;
        let filepath = path.resolve(path.join(commandsPath, event.type));
        return require(filepath);
    }

    deserializeEvent(event={}){
        event = process.env.MINION_PAYLOAD;
        event = JSON.parse(event);
        return event;
    }
}

module.exports = ProcessCommandRunner;

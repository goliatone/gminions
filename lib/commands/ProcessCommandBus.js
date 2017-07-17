'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const CommandBus = require('./CommandBus');
const extend = require('gextend');

class ProcessCommandBus extends CommandBus {

    init(){

        this.mergeEnv = false;

        this.environmentVariable = 'MINION_PAYLOAD';

        this.commandsPath = './example';

        this.executeOptions = {
            stdio: [
                'ignore',
                fs.openSync('./out.log', 'a'),
                fs.openSync('./out.log', 'a')
            ],
            detached: true
        };

        this.exec = spawn;
    }

    execute(event){
        let options = extend({}, this.executeOptions);
        options.env = this.serializePaylod(event);

        if(this.mergeEnv) {
            options.env = extend({}, process.env, options.env);
        }

        let command = this.getCommand(event);

        console.log('Execute: path %s [%j]', command.execPath, command.args);

        this.exec(command.execPath, command.args, options).unref();
    }

    getCommand(event){
        return {
            execPath: this.getCommandExecutable(event),
            args: this.getCommandArguments(event)
        };
    }

    getCommandExecutable(event){
        return process.execPath;
    }

    getCommandArguments(event){
        let commandName = this.getCommandNameFromEvent(event);

        //We might want to
        let args = [commandName];

        return args;
    }

    getCommandNameFromEvent(event) {
        return `./${this.commandsPath}/${event.type}.js`;
    }

    //THIS IS INTENDED TO BE OVERRIDEN
    serializePaylod(event) {
        let env = {};

        /*
         * This type does only take serializable
         * payloads. We should have a list of
         * words to serialize and a way to replace
         * non serializable objects. i.e context.
         */
        env[this.environmentVariable] = JSON.stringify(event);

        return env;
    }
}

module.exports = ProcessCommandBus;

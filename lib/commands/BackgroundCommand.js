'use strict';
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const extend = require('gextend');
const _normalizeCommandObject = require('../utils/normalizeCommandObject');
const Command = require('./Command');

class BackgroundCommand extends Command {

    execute(event) {
        let options = extend({}, this.executeOptions);
        options.env = this.serializePaylod(event);

        if(this.mergeEnv) {
            options.env = extend({}, process.env, options.env);
        }

        let command = this.getCommand(event);

        if(typeof this.onExecute === 'function'){
            this.onExecute(event);
        }

        this.exec(command.execPath, command.args, options).unref();
    }

    getCommand(event){
        return {
            execPath: this.getCommandExecutable(event),
            args: this.getCommandArguments(event)
        }
    }

    getCommandArguments(event) {
        let commandName = this.getCommandNameFromEvent(event);

        let args = [commandName];

        return args;
    }
}

BackgroundCommand.DEFAULTS = {
    mergeEnv: false,
    environmentVariable: 'MINION_PAYLOAD',
    commandsPath: './commands',
    runner: 'cli',
    executeOptions: {
        stdio: [
            'ignore',
            fs.openSync('./out.log', 'a'),
            fs.openSync('./out.log', 'a')
        ],
        detached: true
    },
    exec: spawn,
    serializePaylod: function(event){
        let env = {};

        /*
         * This type does only take serializable
         * payloads. We should have a list of
         * words to serialize and a way to replace
         * non serializable objects. i.e context.
         */
        env[this.environmentVariable] = JSON.stringify(event);

        return env;
    },
    getCommandExecutable(event){
        return process.execPath;
    },
    getCommandNameFromEvent(event) {
        return `${this.commandsPath}/${this.runner}`;
    }
};

module.exports = BackgroundCommand;

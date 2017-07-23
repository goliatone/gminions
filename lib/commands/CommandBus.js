'use strict';
const extend = require('gextend');

class CommandBus {

    constructor(options){
        this.init(options);
    }

    init(options){
        options = extend({}, this.constructor.DEFAULTS, options);
        extend(this, options);
        this._commands = new Map();
    }

    execute(event) {
        let command = this._commands.get(event.type);
        if(!command) return;
        //if we have a command class.
        if(command.execute){
            return Promise.resolve(command.execute(event));
        } else if(command.prototype.execute) {
            let config = this.getConfigFor(event.type);
            command = new command(config);
            return Promise.resolve(command.execute(event));
        }
        //we assume we have a function. Check!!
        return Promise.resolve(command(event));
    }

    getConfigFor(type){
        return {};
    }

    add(type, command){
        this._commands.set(type, command);
    }
}

CommandBus.DEFAULTS = {};

module.exports = CommandBus;

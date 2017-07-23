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

    execute(command) {

    }

    add(type, command){
        this._commands.set(type, command);
    }
}

CommandBus.DEFAULTS = {};

module.exports = CommandBus;

'use strict';
const extend = require('gextend');

class CommandBus {

    constructor(options){
        this.init(options);
    }

    init(options){
        options = extend({}, this.constructor.DEFAULTS, options);
        extend(this, options);
    }

    execute(command) {

    }
}

CommandBus.DEFAULTS = {};

module.exports = CommandBus;

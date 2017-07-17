'use strict';
const extend = require('gextend');

class CommandRunner {
    constructor(options){
        this.init(options);
    }

    init(options){
        options = extend({}, this.constructor.DEFAULTS, options);
        extend(this, options);
    }

    run(event={}){

    }
}

CommandRunner.DEFAULTS = {};

module.exports = CommandRunner;

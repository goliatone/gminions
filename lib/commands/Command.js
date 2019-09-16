'use strict';

const extend = require('gextend');

class Command {
    constructor(options){
        this.init(options);
    }

    init(options={}){
        options = extend({}, this.constructor.DEFAULTS, options);
        extend(this, options);
        return options;
    }

    execute(event){}
}

module.exports = Command;

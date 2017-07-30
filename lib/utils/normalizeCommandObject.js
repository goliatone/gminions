'use strict';


module.exports = function normalizeCommandObject(command, config={}){
    if(command.execute){
        return command;
    } else if(command.prototype.execute) {
        return new command(config);
    }

    /*
     * we assume we have a function.
     * Check!!
     */
    return {
        execute: command
    };
}

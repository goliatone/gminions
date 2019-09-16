'use strict';


module.exports = function normalizeCommandObject(command, config={}){
    //TODO: What to do with undefined command?
    if(!command){
        
    }

    if(command.execute){
        return command;
    } else if(command.prototype && command.prototype.execute) {
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

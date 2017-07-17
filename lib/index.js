'use strict';
/**
 * goliatone
 *
 * This is a file generated with love :)
 */
module.exports.gminions = function(){
    console.log('We are running gminions');
    execute();
    return true;
};

class Exector {
    constructor(options) {

    }

    init(config) {

    }

    execute(command){

    }
}

function execute(env={}){
    // env = process.env;

    const CommandBus = require('./commands/ProcessCommandBus');

    let bus = new CommandBus({});

    bus.execute({
        type: 'background',
        id: 'j57lpaiw-1xk1n62cde7',
        transport: {
            req: 'ipc',
            res: 'mqtt'
        },
        payload: {
            identity: 'Peperone',
            clientId: 'testing-01',
            files: ['a.png', 'b.png', 'c.png']
        }
    });
}

if(!module.parent){
    execute();
}

'use strict';
/**
 * goliatone
 *
 * This is a file generated with love :)
 */
module.exports.gminions = function(){
    console.log('We are running gminions');
    // execute();
    return true;
};

module.exports.CommandBus = require('./commands/CommandBus');
module.exports.CommandRunner = require('./commands/CommandRunner');
module.exports.ProcessCommandBus = require('./commands/ProcessCommandBus');
module.exports.ProcessCommandRunner = require('./commands/ProcessCommandRunner');

exports.EventBus = require('./events/EventBus');


function execute(env={}){
    // env = process.env;

    const CommandBus = require('./commands/ProcessCommandBus');

    let bus = new CommandBus({
        commandsPath: './example',
        runner: 'runner.js',
    });

    bus.execute({
        type: 'background',
        id: 'j57lpaiw-1xk1n62cde7',
        transport: {
            req: 'exec',
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
    // execute();
}

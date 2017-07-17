'use strict';
const mqtt = require('mqtt');
const Runner = require('../lib/commands/ProcessCommandRunner');

let command = new Runner();
const client  = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', ()=>{

    function notify(event, status) {
        let message = JSON.stringify(event);
        client.publish(`minion/${event.id}/${status}`, message);
        client.end();
    }

    command.run({
        commandsPath: './example'
    }).then((result)=>{
        notify(result, 'complete');
    }).catch((error)=>{
        notify(error, 'error');
    });
});

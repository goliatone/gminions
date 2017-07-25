'use strict';
const mqtt = require('mqtt');
const Runner = require('../lib/commands/ProcessCommandRunner');

let command = new Runner({
    commandsPath: './example'
});

const client  = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', ()=>{

    function notify(event, status) {
        let message = JSON.stringify(event);
        let topic = `minion/${event.uid}/${status}`;

        console.log('Topic: %s', topic);

        client.publish(topic, message);
        client.end();
    }

    command.run({}).then((result) => {
        notify(result, 'complete');
    }).catch((error)=>{
        notify(error, 'error');
    });
});

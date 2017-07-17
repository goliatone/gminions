'use strict';

function BackgroundCommand(event) {
    console.log('BackgroundCommand execute!');

    return new Promise(function(resolve, reject) {
        console.log('Execute command type: %s', event.type);
        console.log('Response type: %s', event.transport.res);
        console.log('Payload: ', JSON.stringify(event.payload, null, 4));

        setTimeout(()=>{
            console.log('... and we are done :)');
            resolve({result: 23});
        }, 1000);
    });
}

module.exports = BackgroundCommand;

if(!module.parent) {
    let event = process.env.MINION_PAYLOAD;
    event = JSON.parse(event);

    const mqtt = require('mqtt');
    const client  = mqtt.connect('mqtt://test.mosquitto.org');

    BackgroundCommand(event).then((result)=>{
        event.result = result;
        let message = JSON.stringify(event);

        client.on('connect', function () {
            client.publish(`minion/${event.id}/complete`, message);
            client.end();
        });

    }).catch((err)=>{
        client.on('connect', function () {
            event.error = err;
            let message = JSON.stringify(event);
            client.publish(`minion/${event.id}/error`, message);
            client.end();
        });
    });
}

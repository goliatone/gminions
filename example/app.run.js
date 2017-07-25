'use strict';

function AppRunBackgroundCommand(event) {
    console.log('AppRunBackgroundCommand execute!');

    return new Promise(function(resolve, reject) {
        console.log('1- Execute command type: %s', event.type);
        console.log('2- Response type: %s', event.transport.res);
        console.log('3- Payload: ', JSON.stringify(event.payload, null, 4));

        setTimeout(()=>{
            console.log('... and we are done :)');
            resolve({average: Math.round(Math.random() * 100)});
        }, 1000);
    });
}

module.exports = AppRunBackgroundCommand;

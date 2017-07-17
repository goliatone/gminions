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

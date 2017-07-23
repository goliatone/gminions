'use strict';

function BackgroundCommand(event) {
    console.log('BackgroundCommand execute!');

    return new Promise(function(resolve, reject) {
        console.log('Execute command type: %s', event.type);
        console.log('Response type: %s', event.transport.res);
        console.log('Payload: ', JSON.stringify(event.payload, null, 4));

        setTimeout(()=>{
            console.log('... and we are done :)');
            resolve({average: Math.round(Math.random() * 100)});
        }, 1000);
    });
}

module.exports = BackgroundCommand;

function handler(){
    var h = new Map();
    var i = {};
    h.run = function(e){
        return new Promise(function(resolve, reject) {
            let c = h.get(e.type);
            if(c.prototype.execute){
                c = new c();
                resolve(c.execute(e));
            } else {
                resolve(c(e));
            }
        });
    };
    h.register = function(type, command){
        h.set(type, command);
    }

    return h;
}

'use strict';

class EventQueue {

    constructor(transport){
        this.reset();
        this.transport = transport;
    }

    publish(event) {
        this._pubs.add(event);
    }

    subscribe(subscription, handler){
        this._subs.add({subscription, handler});
    }

    dequeue(transport=this.transport) {

        this._subs.forEach((obj)=>{
            transport.doSubscribe(obj.subscription, obj.handler);
        });

        //TODO: We should enable stepped publish
        this._pubs.forEach((event) => {
            transport.doPublish(event);
        });

        this.reset();
    }

    reset(){
        this._subs = new Set();
        this._pubs = new Set();
    }
}

module.exports = EventQueue;

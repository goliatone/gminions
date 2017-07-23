'use strict';

const Transport = require('./transport');

class TransportManager extends Transport {

    init(options){
        options = super.init(options);
        this._transports = {};

        return options;
    }

    setDefault(defaultTransport){
        this._defaultTransport = defaultTransport;
    }

    add(type, transport) {
        this._transports[type] = transport;
    }

    doSubscribe(subscription, handler){
        let type = subscription.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx) => {
            console.log('type %s', tx);
            this._transports[tx].doSubscribe(subscription, handler);
        });
    }

    doPublish(event){
        let type = event.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx)=>{
            console.log('type %s', tx);
            this._transports[tx].doPublish(event);
        });
    }

    doUnsubscribe(subscription, handler){
        let type = subscription.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx)=>{
            console.log('type %s', tx);
            this._transports[tx].doUnsubscribe(subscription, handler);
        });
    }
}

module.exports = TransportManager;

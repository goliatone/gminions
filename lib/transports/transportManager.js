'use strict';

const Transport = require('./transport');

class TransportManager extends Transport {

    init(options){
        options = super.init(options);
        this._transports = {};

        //TODO: This might not be the best way to go
        //about it. But we dont want to wire every time.
        this.registerGlobalTransports();

        return options;
    }

    registerGlobalTransports(){
        let Tx;
        Object.keys(TransportManager._transports).forEach((id)=>{
            console.log('register', id);
            Tx = TransportManager._transports[id];
            this.add(id, new Tx());
        });
    }

    add(id, transport) {
        this._transports[id] = transport;
    }

    doSubscribe(subscription, handler){
        let type = subscription.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx) => {
            if(!this._transports[tx]){
                this.logger.error('Transport "%s" not registered', tx);
            }

            this._transports[tx].doSubscribe(subscription, handler);
        });
    }

    doPublish(event){
        let type = event.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx)=>{
            if(!this._transports[tx]){
                this.logger.error('Transport "%s" not registered', tx);
            }
            this._transports[tx].doPublish(event);
        });
    }

    doUnsubscribe(subscription, handler){
        let type = subscription.transport || this._defaultTransport;
        if(!Array.isArray(type)) type = [type];

        type.map((tx)=>{
            if(!this._transports[tx]){
                this.logger.error('Transport "%s" not registered', tx);
            }
            this._transports[tx].doUnsubscribe(subscription, handler);
        });
    }

    set defaultTransport(defaultTransport){
        this._defaultTransport = defaultTransport;
    }

    get defaultTransport(){
        return this._defaultTransport;
    }
}

TransportManager.DEFAULTS = {
    defaultTransport: 'emitter'
};

TransportManager._transports = {};

TransportManager.register = function(type, transport){
    this._transports[type] = transport;
};

module.exports = TransportManager;

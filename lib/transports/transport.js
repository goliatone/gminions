'use strict';

const extend = require('gextend');
const EventQueue = require('../utils/eventQueue');
const SubscriptionManager = require('../utils/subscriptionManager');

class Transport {
    constructor(options){
        this.init(options);
    }

    init(options={}){

        let defaults = this.constructor.DEFAULTS;
        options = extend({}, Transport.DEFAULTS, defaults, options);

        this.ready = false;

        this._queue = new EventQueue(this);
        this._subscriptions = new SubscriptionManager();

        extend(this, options);

        if(this.autoconnect) this.connect();

        return options;
    }

    connect(){}

    _onConnectionReady(){
        this.ready = true;
        this._queue.dequeue();
    }

    disconnect(){}

    doPublish(event){}

    doSubscribe(subscription, handler){}

    doUnsubscribe(subscription, handler){}
}

Transport.DEFAULTS = {
    autoconnect: true,
    logger: console
};

module.exports = Transport;
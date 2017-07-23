'use strict';

class SubscriptionManager {

    constructor(){
        this._subscriptions = {};
    }

    add(topic, subscription, handler){
        if(!this._subscriptions[topic]){
            this._subscriptions[topic] = [];
        }

        this._subscriptions[topic].push({
            subscription,
            handler
        });
        return this;
    }

    get(topic){
        return this._subscriptions[topic];
    }

    each(cb){
        return Object.keys(this._subscriptions).forEach(cb);
    }
}

module.exports = SubscriptionManager;

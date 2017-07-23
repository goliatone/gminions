'use strict';

const extend = require('gextend');

class EventBus {

    constructor(options){
        this.init(options);
    }

    init(options){
        options = extend({}, this.constructor.DEFAULTS, options);

        extend(this, options);

        return options;
    }

    /**
     *
     * @param  {Event} event
     * @return {EventBus}
     */
    publish(event) {
        this.setDefaultEventProperties(event);
        this.transport.doPublish(event);
        return this;
    }

    /**
     *
     * @param  {Object|String} subscription    Event type
     * @param  {Function} handler Handler function
     * @return {EventBus}
     */
    subscribe(subscription, handler) {
        subscription = this.normalizeSubscription(subscription);

        this.transport.doSubscribe(subscription, handler);

        return this;
    }

    unsubscribe(subscription, handler){
        subscription = this.normalizeSubscription(subscription);

        this.transport.doUnsubscribe(subscription, handler);

        return this;
    }


    /**
     * Normalizes the subscription object.
     * It will also normalize the topic string so
     * that different transports use the same
     * syntax.
     *
     * @param  {Mixed} subscription
     * @return {Object}
     */
    normalizeSubscription(subscription){

        if(typeof subscription === 'string') {
            subscription = {type: subscription};
        }

        return subscription;
    }

    setDefaultEventProperties(event){
        if(!event.uid) event.uid = this.makeUid();
        if(!event.context) event.context = this.context;
    }

    makeUid() {
        const timestamp = (new Date()).getTime().toString(36);
        const randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');
        return `${timestamp}-${randomString}`;
    }

    get context(){
        /*
         * TODO: What should be the value for
         * default context?
         */
        return this._context || {};
    }

    set context(v){
        this._context = v;
    }
}

EventBus.EventBus = {};

module.exports = EventBus;

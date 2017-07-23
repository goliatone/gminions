'use strict';

const Transport = require('./transport');
const EventEmitter = require('events');

class EventTransport extends Transport {

    init(options){
        options = super.init(options);
        this._dispatcher = options.dispatcher || new EventEmitter();
    }

    doUnsubscribe(subscription, handler) {
        this._dispatcher.removeListener(subscription.type, handler);
    }

    doPublish(event) {
        let events = this._dispatcher.eventNames();

        events.forEach((topic)=>{
            if(!this.matches(event.type, topic)) return;
            this._dispatcher.emit(topic, event);
        });

        return this;
    }

    matches(topic, type) {
        if (type === topic) return true;
        let pattern = '^' + type.replace(/\+/g, '([^.]+)').replace(/\*/g, '([^.]+\.?)+') + '$';
        return topic.search(pattern) !== -1;
    }

    doSubscribe(subscription, handler) {
        if(subscription.once) {
            this._dispatcher.once(subscription.type, handler);
        } else {
            this._dispatcher.on(subscription.type, handler);
        }
    }
}

EventTransport.ID = 'emitter';

/*
 * Globally register MqttTransport
 */
require('./transportManager').register(EventTransport.ID, EventTransport);

module.exports = EventTransport;

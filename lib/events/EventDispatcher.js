'use strict';


const EventBus = require('./EventBus');
const EventEmitter = require('events');

//TODO: should extend EventTransport, and EventBus should
//handle and use transports.
class EventDispatcher extends EventBus {

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
        // console.log('type %s for topic %s', type, topic);
        // console.log('pattern: %s', pattern);
        return topic.search(pattern) !== -1;
    }

    //TODO: How to handle pattern matching in topics?
    doSubscribe(subscription, handler) {
        if(subscription.once) {
            this._dispatcher.once(subscription.type, handler);
        } else {
            this._dispatcher.on(subscription.type, handler);
        }
    }
}

module.exports = EventDispatcher;

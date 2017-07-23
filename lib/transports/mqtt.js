'use strict';

const mqtt = require('mqtt');
const Transport = require('./transport')

class MqttTransport extends Transport {

    connect(){
        this.client = mqtt.connect(this.url);

        this.client.on('message', (topic, message) => {

            //TODO: we should add context :)
            let event = JSON.parse(message),
                subs;

            Object.keys(this._subscriptions).forEach((pattern)=>{
                if(!this.matches(topic, pattern)) return;
                subs = this._subscriptions[pattern];
                subs.forEach((obj, i) => {
                    obj.handler(event);
                    if(obj.subscription.once) {
                        subs.splice(i, 1);
                    }
                });
            });
        });

        this.client.on('connect', ()=>{
            this._onConnectionReady();
        });
    }

    doPublish(event) {
        if(!this.ready) {
            this._queue.publish(event);
            return this;
        }

        //TODO: We need to get rid of context :(
        //https://stackoverflow.com/questions/12975430/custom-object-to-json-then-back-to-a-custom-object
        //http://code.runnable.com/UlesEPH5ickbAAAt/how-to-customize-javascript-objects-serialization-to-json
        let message = JSON.stringify(event);

        let topic = this.fixTopic(event.type);

        this.client.publish(topic, message);
    }

    doSubscribe(subscription, handler){
        if(!this.ready){
            this._queue.subscribe(subscription, handler);
            return this;
        }

        let topic = this.fixTopic(subscription.type);

        //This should handle multple handlers for same topic
        if(!this._subscriptions[topic]){
            this._subscriptions[topic] = [];
        }

        this._subscriptions[topic].push({
            subscription,
            handler
        });

        this.client.subscribe(topic);
    }

    fixTopic(type){
        return type.replace(/\./g, '/')
            .replace(/\*/g, '#')
            .replace(/#.+/, '#');
    }

    matches(topic, type) {
        const patterns = type.split('/');
        const length = patterns.length;
        const topicArray = topic.split('/');
        let i, left, right;
        for (i = 0; i < length; ++i) {
            left = patterns[i];
            right = topicArray[i];
            if (left === '#') return true;
            if (left !== '+' && left !== right) return false;
        }

        return length === topicArray.length;
    }
}

MqttTransport.DEFAULTS = {
    url: 'mqtt://test.mosquitto.org'
};

module.exports = MqttTransport;
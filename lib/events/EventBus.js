'use strict';


class EventBus {

    emit(event) {
        
    }

    getUid() {
        const timestamp = (new Date()).getTime().toString(36);
        const randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');
        return `${timestamp}-${randomString}`;
    }
}

module.exports = EventBus;

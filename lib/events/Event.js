'use strict';


class Event {

    constructor(type, message, context){
        this._type = type;
        this._message = message;
        this._context = context;
    }

    get type(){
        return this._type;
    }

    get mesage(){
        return this._message;
    }

    get context(){
        return this._context;
    }

    set uid(v){
        this._uid = v;
    }
    
    get uid(){
        return this._uid;
    }
}

exports = Event;

'use strict';
const extend = require('gextend');
const _normalizeCommandObject = require('../utils/normalizeCommandObject');

class CommandBus {

    constructor(options){
        this.init(options);
    }

    init(options){
        options = extend({}, this.constructor.DEFAULTS, options);
        extend(this, options);
        this._commands = new CommandMap(this);
    }

    execute(event) {
        //TODO: We can check event and use a differnet CommandSet
        let commandSet = this._commands.find(event.type, this.matches);
        console.log('Execute commandSet', commandSet.length);
        return commandSet.execute(event);
    }

    doExecute(command, event) {
        command = this.normalizeCommandObject(command, event);

        return Promise.resolve(command.execute(event));
    }

    getConfigFor(type){
        return {};
    }

    add(type, command){

        this._commands.set(type, command);

        this.eventBus.subscribe(type, (event)=>{
            this.execute(event);
        });
    }

    normalizeCommandObject(command, event){
        let config = this.getConfigFor(event.type);
        return _normalizeCommandObject(command, config);
    }
}

CommandBus.DEFAULTS = {
    matches: require('../utils/matcher')
};

module.exports = CommandBus;


class CommandMap {
    constructor(owner){
        this._map = new Map();
        this.ownerExecute = owner.doExecute.bind(owner);
    }

    set(type, command) {
        if(!this._map.has(type)) {
            this._map.set(type, []);
        }

        this._map.get(type).push(command);

        return this;
    }

    find(type, filter, CommandSetImp=CommandSet) {

        let commandMap = new CommandSetImp();
        commandMap.ownerExecute = this.ownerExecute;

        this._map.forEach((val, key)=>{
            if(filter(type, key)) {
                commandMap.set(val);
            }
        });

        return commandMap;
    }
}

class CommandSet extends Array {
    set(value){
        if(!Array.isArray(value)) value = [value];
        value.map((c)=>{
            if(c){
                console.log('Add command');
                this.push(c);
            }
        });
        return this;
    }

    execute(event) {
        return this.map((cmd)=>{
            return this.ownerExecute(cmd, event);
        });
    }
}

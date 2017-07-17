'use strict';

const test = require('tape');
const sinon = require('sinon');

const Module = require('../lib')['gminions'];

test('Module should be bootstraped OK', (t)=>{
    t.ok(Module());
    t.end();
});

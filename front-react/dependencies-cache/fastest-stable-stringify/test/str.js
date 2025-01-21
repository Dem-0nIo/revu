'use strict';

var test = require('tape');
var stringify = require('../');

test('simple object', function (t) {
    t.plan(1);
    var obj = { c: 6, b: [4,5], a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"b":[4,5],"c":6,"z":null}');
});

test('object with undefined', function (t) {
    t.plan(1);
    var obj = { a: 3, z: undefined };
    t.equal(stringify(obj), '{"a":3}');
});

test('object with undefined as first property value', function (t) {
    t.plan(1);
    var obj = { a: undefined, z: 3};
    t.equal(stringify(obj), '{"z":3}');
});

test('object with null', function (t) {
    t.plan(1);
    var obj = { a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"z":null}');
});

test('object with NaN and Infinity', function (t) {
    t.plan(1);
    var obj = { a: 3, b: NaN, c: Infinity };
    t.equal(stringify(obj), '{"a":3,"b":null,"c":null}');
});

test('array with undefined', function (t) {
    t.plan(1);
    var obj = [4, undefined, 6];
    t.equal(stringify(obj), '[4,null,6]');
});

test('object with empty string', function (t) {
    t.plan(1);
    var obj = { a: 3, z: '' };
    t.equal(stringify(obj), '{"a":3,"z":""}');
});

test('array with empty string', function (t) {
    t.plan(1);
    var obj = [4, '', 6];
    t.equal(stringify(obj), '[4,"",6]');
});

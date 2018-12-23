"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var counter = exports.counter = 1;

exports.default = function () {
    exports.counter = counter += 1;
};
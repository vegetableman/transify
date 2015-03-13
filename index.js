(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var events = _interopRequire(require("add-event-listener"));

var transitionEnd = _interopRequire(require("transitionend-property"));

module.exports = function (elem) {
    var opts = arguments[1] === undefined ? {} : arguments[1];

    var TICK = 17;

    if (!elem) throw new Error("Provide an element.");
    if (!opts.transitionName) throw new Error("Provide a transition name.");

    function applyTransition(node, type, cb) {
        var className = opts.transitionName + "-" + type;
        var activeClassName = className + "-active";
        var endListener = function () {
            if (cb) cb();
            node.classList.remove(className);
            node.classList.remove(activeClassName);
            events.removeEventListener(node, endListener);
        };

        events.addEventListener(node, transitionEnd, endListener);
        node.classList.add(className);
        setTimeout(function () {
            node.classList.add(activeClassName);
        }, opts.tick || TICK);
    }

    return {
        append: function (node) {
            applyTransition(node, "enter");
            elem.appendChild(node);
        },

        remove: function (node) {
            applyTransition(node, "leave", function () {
                elem.removeChild(node);
            });
        }
    };
};

},{"add-event-listener":2,"transitionend-property":3}],2:[function(require,module,exports){
addEventListener.removeEventListener = removeEventListener
addEventListener.addEventListener = addEventListener

module.exports = addEventListener

var Events = null

function addEventListener(el, eventName, listener, useCapture) {
  Events = Events || (
    document.addEventListener ?
    {add: stdAttach, rm: stdDetach} :
    {add: oldIEAttach, rm: oldIEDetach}
  )
  
  return Events.add(el, eventName, listener, useCapture)
}

function removeEventListener(el, eventName, listener, useCapture) {
  Events = Events || (
    document.addEventListener ?
    {add: stdAttach, rm: stdDetach} :
    {add: oldIEAttach, rm: oldIEDetach}
  )
  
  return Events.rm(el, eventName, listener, useCapture)
}

function stdAttach(el, eventName, listener, useCapture) {
  el.addEventListener(eventName, listener, useCapture)
}

function stdDetach(el, eventName, listener, useCapture) {
  el.removeEventListener(eventName, listener, useCapture)
}

function oldIEAttach(el, eventName, listener, useCapture) {
  if(useCapture) {
    throw new Error('cannot useCapture in oldIE')
  }

  el.attachEvent('on' + eventName, listener)
}

function oldIEDetach(el, eventName, listener, useCapture) {
  el.detachEvent('on' + eventName, listener)
}

},{}],3:[function(require,module,exports){
/**
 * Transition-end mapping
 */

var map = {
  'WebkitTransition' : 'webkitTransitionEnd',
  'MozTransition' : 'transitionend',
  'OTransition' : 'oTransitionEnd',
  'msTransition' : 'MSTransitionEnd',
  'transition' : 'transitionend'
};

/**
 * Expose `transitionend`
 */

var el = document.createElement('p');

for (var transition in map) {
  if (null != el.style[transition]) {
    module.exports = map[transition];
    break;
  }
}

},{}]},{},[1])
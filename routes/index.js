'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Route = _interopDefault(require('route-parser'));

function createRoute(path_user) {
    var route = new Route(path_user);
    var f = function f(params) {
        return route.reverse(params);
    };
    f.match = function (route_built) {
        return route.match(getDefaultPathname(route_built));
    };
    return f;
}

function getDefaultPathname(route) {
    return typeof route != 'string' && typeof window != 'undefined' ? window.location.href.slice(location.origin.length) : route;
}

// https://github.com/rcs/route-parser
// https://github.com/snd/url-pattern
// https://github.com/troch/path-parser

exports.createRoute = createRoute;

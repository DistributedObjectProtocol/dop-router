'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Route = _interopDefault(require('route-parser'));

function createRoute(path_user) {
    const route = new Route(path_user);
    const f = params => route.reverse(params);
    f.match = route_built => route.match(getDefaultPathname(route_built));
    return f
}

function getDefaultPathname(route) {
    return typeof route != 'string' && typeof window != 'undefined'
        ? window.location.href.slice(location.origin.length)
        : route
}

// https://github.com/rcs/route-parser
// https://github.com/snd/url-pattern
// https://github.com/troch/path-parser

exports.createRoute = createRoute;

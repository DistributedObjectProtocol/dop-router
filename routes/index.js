'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Route = _interopDefault(require('route-parser'));

function createGroup() {
    var routes = [];
    var add = function add(route) {
        if (typeof route == 'function') {
            routes.push(route);
            return route;
        }
        return false;
    };
    var remove = function remove(route) {
        var index = routes.indexOf(route);
        if (index > -1) {
            routes.splice(routes.indexOf(route), 1);
            return route;
        }
        return false;
    };
    var getRoute = function getRoute(path) {
        for (var index = 0; index < routes.length; index++) {
            if (routes[index].match(path)) {
                return routes[index];
            }
        }
        return false;
    };
    var getParams = function getParams(path) {
        var params = {};
        for (var index = 0; index < routes.length; index++) {
            var matches = routes[index].match(path);
            if (matches !== false) for (var param in matches) {
                if (typeof matches[param] == 'string') params[param] = matches[param];
            }
        }
        return params;
    };
    return {
        routes: routes,
        add: add,
        remove: remove,
        getRoute: getRoute,
        getParams: getParams
    };
}

function createRoute(path_user) {
    var route = new Route(path_user);
    var f = function f(params) {
        return route.reverse(params);
    };
    f.match = function (path) {
        return route.match(getDefaultPathname(path));
    };
    f.route = route;
    return f;
}

function getDefaultPathname(route) {
    return typeof route != 'string' && typeof window != 'undefined' && typeof window.location != 'undefined' ? window.location.href.slice(location.origin.length) : route;
}

// https://github.com/rcs/route-parser
// https://github.com/snd/url-pattern
// https://github.com/troch/path-parser

exports.createGroup = createGroup;
exports.createRoute = createRoute;

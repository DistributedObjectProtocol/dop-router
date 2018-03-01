'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dop = require('dop');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var enc = encodeURIComponent;

function createLocation(url, object, prop) {
    var shallWeEmit = false;
    var location = void 0;
    var urlparsed = parse(url);
    prop = prop || 'location';

    if (object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
        if (dop.isRegistered(object)) dop.set(object, prop, urlparsed);else {
            object[prop] = urlparsed;
            object = dop.register(object);
        }

        location = object[prop];
    } else location = dop.register(urlparsed);

    location.toString = function () {
        return location.href;
    };

    dop.intercept(location, function (mutation, object) {
        if (!shallWeEmit) {
            if (mutation.prop === 'href') {
                object.href = mutation.oldValue;
                pushState(mutation.value);
                setHref(getWindowLocation());
            } else if (mutation.prop === 'pathname') {
                var href = mutation.value.split('/').map(enc).join('/');
                if (mutation.value[0] !== '/') href = '/' + href;
                href = href + location.search + location.hash;
                object.pathname = mutation.oldValue;
                pushState(href);
                setHref(getWindowLocation());
            } else if (mutation.prop === 'search') {
                var _href = mutation.value[0] === '?' ? mutation.value.substr(1) : mutation.value;
                _href = _href.split('&').map(function (param) {
                    var splited = param.split('=');
                    param = enc(splited[0] || '');
                    if (splited.hasOwnProperty(1)) param += '=' + enc(splited[1]);
                    return param;
                }).join('&');

                _href = location.pathname + '?' + _href + location.hash;
                object.search = mutation.oldValue;
                pushState(_href);
                setHref(getWindowLocation());
            } else if (mutation.prop === 'hash') {
                var _href2 = mutation.value[0] === '#' ? mutation.value : '#' + mutation.value;
                _href2 = location.pathname + location.search + _href2;
                object.hash = mutation.oldValue;
                pushState(_href2);
                setHref(getWindowLocation());
            } else if (mutation.prop === 'path') {
                var _href3 = '/' + mutation.value.map(enc).join('/') + location.search + location.hash;
                pushState(_href3);
                setHref(getWindowLocation(), mutation);
            } else if (mutation.prop === 'query') {
                var _href4 = void 0,
                    _prop = void 0,
                    query = mutation.value,
                    search = [];
                for (_prop in query) {
                    search.push(enc(_prop) + '=' + enc(query[_prop]));
                }_href4 = location.pathname + '?' + search.join('&') + location.hash;
                pushState(_href4);
                setHref(getWindowLocation());
            } else
                // origin, protocol, domain
                object[mutation.prop] = mutation.oldValue;
        }

        return shallWeEmit;
    });

    dop.intercept(location.path, function (mutation, object) {
        if (!shallWeEmit) {
            var path = location.path;
            object[mutation.prop] = enc(path[mutation.prop]);
            var href = '/' + path.filter(function (p) {
                return p !== undefined;
            }).join('/') + location.search + location.hash;
            if (href !== location.pathname) {
                pushState(href);
                setHref(getWindowLocation(), mutation);
            }
        }
        return shallWeEmit;
    });

    dop.intercept(location.query, function (mutation, object) {
        if (!shallWeEmit) {
            var href = void 0,
                query = location.query,
                search = [],
                _prop2 = mutation.prop;
            // Is true if is not a delete
            if (mutation.hasOwnProperty('value')) {
                var propenc = enc(mutation.prop);
                var valueenc = enc(mutation.value);
                delete object[mutation.prop];
                object[propenc] = valueenc;
            }
            for (_prop2 in query) {
                search.push(_prop2 + '=' + query[_prop2]);
            }href = location.pathname + '?' + search.join('&') + location.hash;

            pushState(href);
            setHref(getWindowLocation(), mutation);
        }
        return shallWeEmit;
    });

    function setHref(href, mutation) {
        var newlocation = parse(href);
        newlocation.href = getHref(newlocation);
        var collector = dop.collect();
        if (mutation !== undefined) collector.mutations.push(mutation);
        shallWeEmit = true;
        dop.set(location, 'href', newlocation.href);
        dop.set(location, 'pathname', newlocation.pathname);
        dop.set(location, 'search', newlocation.search);
        dop.set(location, 'hash', newlocation.hash);

        // path
        newlocation.path.forEach(function (path, index) {
            return dop.set(location.path, index, path);
        });
        dop.set(location.path, 'length', newlocation.path.length);

        // query
        var prop = void 0,
            newquery = newlocation.query,
            query = location.query;
        for (prop in newquery) {
            dop.set(query, prop, newquery[prop]);
        }for (prop in query) {
            if (!newquery.hasOwnProperty(prop)) dop.del(query, prop);
        } // emit
        shallWeEmit = false;
        collector.emit();
    }

    // when user click back/forward on browser or change the hash
    if (window) window.addEventListener('popstate', function () {
        setHref(getWindowLocation());
    });

    return location;
}

function pushState(url, state, title) {
    // if nodejs ... todo
    window.history.pushState(state, title, url);
}

function getWindowLocation() {
    // if nodejs ... todo
    return window.location.href;
}

function getHref(location) {
    return location.pathname + location.search + location.hash;
}

function parse(url) {
    var match = /((.*):\/\/([^/#?]+))?([^?#]*)([^#]*)(.*)?/.exec(url),
        query = {},
        location = {
        origin: match[1],
        protocol: match[2],
        host: match[3],
        pathname: match[4],
        path: match[4].split('/').filter(function (item) {
            return item.length > 0;
        }),
        search: match[5],
        query: query,
        hash: match[6] || ''
    };

    location.href = getHref(location);

    if (location.search.length > 1) {
        location.search.substr(1).split('&').forEach(function (item) {
            if (item.length > 0) {
                var equal = item.indexOf('=');
                equal > -1 ? location.query[item.substr(0, equal)] = item.substr(equal + 1) : location.query[item] = '';
            }
        });
    }

    return location;
}

exports.createLocation = createLocation;

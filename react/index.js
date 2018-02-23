'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sourceProperty = 'source';
var separatorChar = '-';

function Router(props) {
    var children = props.children;
    var childrens = Array.isArray(children) ? children : [children];
    var source = props[sourceProperty];
    for (var _index = 0, total = childrens.length; _index < total; ++_index) {
        children = childrens[_index];
        if (Check(children.props, source)) return getChildrenOfChildren(children);
    }
}

function Route(props) {
    var children = props.children;

    var source = props[sourceProperty];
    if (Check(props, source)) return children;
}

var Show = Route;

// export function setSourceProperty(name) {
//     sourceProperty = name
// }

// export function setSeparatorChar(char) {
//     separatorChar = char
// }

function getChildrenOfChildren(children) {
    // react || preact
    var child = children.props.children || children.children;
    return Array.isArray(child) ? child[0] : child; //[0] // We can remove [0] when preact supports array of childrens. react16 already does
}

function Check(props, source) {
    if (props.hasOwnProperty('if')) if (!props.if) return false;

    var prop = void 0;
    for (prop in props) {
        if (prop !== 'children' && prop !== sourceProperty && prop !== 'if') {
            var value = source.hasOwnProperty(prop) ? source[prop] : get(source, prop.split(separatorChar));

            if (props[prop] instanceof RegExp) {
                if (!props[prop].test(value)) return false;
            } else if (props[prop] !== value) return false;
        }
    }

    return true;
}

function get(object, path) {
    if (path.length === 0) return object;

    for (var _index2 = 0, total = path.length, tmpobject; _index2 < total; _index2++) {
        tmpobject = object[path[_index2]];

        if (_index2 + 1 < total && tmpobject !== null && (typeof tmpobject === 'undefined' ? 'undefined' : _typeof(tmpobject)) == 'object') object = tmpobject;else if (object.hasOwnProperty(path[_index2])) return tmpobject;else return undefined;
    }

    return object[path[index]];
}

exports.Router = Router;
exports.Route = Route;
exports.Show = Show;

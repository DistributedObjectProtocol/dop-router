const locationProperty = 'location'
const groupProperty = 'group'
const separatorChar = '_'

export function Router(props) {
    let children = props.children
    let childrens = Array.isArray(children) ? children : [children]
    let location = props[locationProperty]
    let group = props[groupProperty]
    for (let index = 0, total = childrens.length; index < total; ++index) {
        children = childrens[index]
        if (Check(children.props, location, group))
            return getChildrenOfChildren(children)
    }
    return null
}

export function Route(props) {
    const { children } = props
    // let location = props[locationProperty]
    return Check(props) ? children : null
}

export const Show = Route

// export function setlocationProperty(name) {
//     locationProperty = name
// }

// export function setSeparatorChar(char) {
//     separatorChar = char
// }

function getChildrenOfChildren(children) {
    // react || preact
    const child = children.props.children || children.children
    return Array.isArray(child) ? child[0] : child //[0] // We can remove [0] when preact supports array of childrens. react16 already does
}

function Check(props, location, group) {
    if (props.hasOwnProperty('if')) if (!props.if) return false

    if (location !== undefined) {
        if (props.hasOwnProperty('is') && group !== undefined) {
            const iss = isArray(props.is) ? props.is : [props.is]
            const route = group.getRoute(location.href)
            const matches = iss.filter(is => route === is)
            if (matches.length === 0) return false
        }

        for (let prop in props) {
            let has_property = location.hasOwnProperty(prop)
            let value = location[prop]
            if (!has_property) {
                const path = prop.split(separatorChar)
                const lastprop = path.pop()
                const obj = get(location, path)
                if (isObject(obj) && obj.hasOwnProperty(lastprop)) {
                    has_property = true
                    value = obj[lastprop]
                }
            }

            if (
                has_property &&
                // prop !== locationProperty &&
                prop !== 'children' &&
                prop !== 'if'
            ) {
                if (props[prop] instanceof RegExp) {
                    if (!props[prop].test(value)) return false
                } else if (props[prop] !== value) return false
            }
        }
    }

    return true
}

function get(object, path) {
    if (path.length === 0) return object

    for (
        let index = 0, total = path.length, tmpobject;
        index < total;
        index++
    ) {
        tmpobject = object[path[index]]

        if (
            index + 1 < total &&
            tmpobject !== null &&
            typeof tmpobject == 'object'
        )
            object = tmpobject
        else if (object.hasOwnProperty(path[index])) return tmpobject
        else return undefined
    }

    return object[path[index]]
}

function isObject(object) {
    return object && typeof object == 'object'
}

function isArray(array) {
    return Array.isArray(array)
}

const locationProperty = 'location'
const separatorChar = '-'

export function Router(props) {
    let children = props.children
    let childrens = Array.isArray(children) ? children : [children]
    let location = props[locationProperty]
    for (let index = 0, total = childrens.length; index < total; ++index) {
        children = childrens[index]
        if (Check(children.props, location))
            return getChildrenOfChildren(children)
    }
}

export function Route(props) {
    let { children } = props
    let location = props[locationProperty]
    if (Check(props, location)) return children
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

function Check(props, location) {
    if (props.hasOwnProperty('if')) if (!props.if) return false

    let prop
    for (prop in props) {
        if (
            location !== undefined &&
            prop !== 'children' &&
            prop !== locationProperty &&
            prop !== 'if'
        ) {
            let value = location.hasOwnProperty(prop)
                ? location[prop]
                : get(location, prop.split(separatorChar))

            if (props[prop] instanceof RegExp) {
                if (!props[prop].test(value)) return false
            } else if (props[prop] !== value) return false
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

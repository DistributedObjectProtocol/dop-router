import Route from 'route-parser'

export function createGroup() {
    const routes = []
    const add = route => {
        if (typeof route == 'function') {
            routes.push(route)
            return route
        }
        return false
    }
    const remove = route => {
        const index = routes.indexOf(route)
        if (index > -1) {
            routes.splice(routes.indexOf(route), 1)
            return route
        }
        return false
    }
    const getRoute = path => {
        for (let index = 0; index < routes.length; index++) {
            if (routes[index].match(path)) {
                return routes[index]
            }
        }
        return false
    }
    const getParams = path => {
        const params = {}
        for (let index = 0; index < routes.length; index++) {
            const matches = routes[index].match(path)
            if (matches !== false)
                for (let param in matches)
                    if (typeof matches[param] == 'string')
                        params[param] = matches[param]
        }
        return params
    }
    return {
        routes,
        add,
        remove,
        getRoute,
        getParams
    }
}

export function createRoute(path_user) {
    const route = new Route(path_user)
    const f = params => route.reverse(params)
    f.match = path => route.match(getDefaultPathname(path))
    f.route = route
    return f
}

function getDefaultPathname(route) {
    return typeof route != 'string' &&
        typeof window != 'undefined' &&
        typeof window.location != 'undefined'
        ? window.location.href.slice(location.origin.length)
        : route
}

// https://github.com/rcs/route-parser
// https://github.com/snd/url-pattern
// https://github.com/troch/path-parser

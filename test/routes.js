const test = require('tape')
const { createRoute, createGroup } = require('../routes')

const route = createRoute('/my/:page')
const route0 = createRoute('/my(/:page)')
const route1 = createRoute('/my/route/:page')
const route1b = createRoute('/my/route(/:page)')
const route2 = createRoute('/my/:page/route')
const route3 = createRoute('/my/:pa_ge/route')
const route4 = createRoute('/my(/:page)/route')
const route5 = createRoute('/my(/:page)/route/:name')
const route6 = createRoute('/my(/:page)/route/:name')
const route7 = createRoute('/my(/:page)/route(/:name)')

test('createRoute', function(t) {
    t.equal(route(), false)
    t.equal(route({ page: 1 }), '/my/1')
    t.equal(route({ page: 'TEXT' }), '/my/TEXT')

    t.equal(route0(), '/my')
    t.equal(route0({ page: 1 }), '/my/1')
    t.equal(route0({ page: 'TEXT' }), '/my/TEXT')

    t.equal(route1(), false)
    t.equal(route1({ page: 1 }), '/my/route/1')
    t.equal(route1({ page: 'TEXT' }), '/my/route/TEXT')

    t.equal(route2(), false)
    t.equal(route2({ page: 1 }), '/my/1/route')
    t.equal(route2({ page: 'TEXT' }), '/my/TEXT/route')

    t.equal(route3(), false)
    t.equal(route3({ pa_ge: 1 }), '/my/1/route')
    t.equal(route3({ pa_ge: 'TEXT' }), '/my/TEXT/route')

    t.equal(route4(), '/my/route')
    t.equal(route4({ page: 1 }), '/my/1/route')
    t.equal(route4({ page: 'TEXT' }), '/my/TEXT/route')

    t.equal(route5(), false)
    t.equal(route5({ page: 1, name: 'NAME' }), '/my/1/route/NAME')
    t.equal(route5({ page: 'TEXT', name: 1234 }), '/my/TEXT/route/1234')

    t.equal(route6(), false)
    t.equal(route6({ name: 'NAME' }), '/my/route/NAME')
    t.equal(route6({ name: 1234 }), '/my/route/1234')

    t.equal(route7(), '/my/route')
    t.equal(route7({ name: 'NAME' }), '/my/route/NAME')
    t.equal(route7({ page: 1234 }), '/my/1234/route')
    t.equal(route7({ name: 'NAME', page: 1234 }), '/my/1234/route/NAME')

    t.end()
})

test('createRoute().match', function(t) {
    t.deepEqual(route1.match(), false)
    t.deepEqual(route1.match('/my/route'), false)
    t.deepEqual(route1.match('/my/route/1?param=1#31'), { page: '1' })
    t.deepEqual(route1.match('/my/route/-_=+`~4!$*&@^()4'), {
        page: '-_=+`~4!$*&@^()4'
    })
    t.deepEqual(route1.match('/my/route/TEXT'), { page: 'TEXT' })

    t.deepEqual(route2.match('/my/1/route'), { page: '1' })
    t.deepEqual(route2.match('/my/TEXT/route'), { page: 'TEXT' })

    t.deepEqual(route3.match('/my/1/route'), { pa_ge: '1' })
    t.deepEqual(route3.match('/my/TEXT/route'), { pa_ge: 'TEXT' })

    t.deepEqual(route4.match('/my/1/route'), { page: '1' })
    t.deepEqual(route4.match('/my/TEXT/route'), { page: 'TEXT' })

    t.deepEqual(route5.match('/my/1/route/NAME'), { page: '1', name: 'NAME' })
    t.deepEqual(route5.match('/my/TEXT/route/1234'), {
        page: 'TEXT',
        name: '1234'
    })

    t.deepEqual(route6.match(), false)
    t.deepEqual(route6.match('/my/route/NAME'), {
        name: 'NAME',
        page: undefined
    })
    t.deepEqual(route6.match('/my/route/1234'), {
        name: '1234',
        page: undefined
    })

    t.deepEqual(route7.match('/my/route'), { name: undefined, page: undefined })
    t.deepEqual(route7.match('/my/route/NAME'), {
        name: 'NAME',
        page: undefined
    })
    t.deepEqual(route7.match('/my/1234/route'), {
        page: '1234',
        name: undefined
    })
    t.deepEqual(route7.match('/my/1234/route/NAME'), {
        name: 'NAME',
        page: '1234'
    })

    t.end()
})

test('createGroup.add/remove', function(t) {
    const group = createGroup()
    t.equal(typeof createGroup, 'function')
    t.equal(typeof group, 'object')
    t.equal(Array.isArray(group.routes), true)
    t.equal(typeof group.add, 'function')
    t.equal(typeof group.remove, 'function')
    t.equal(group.add(route1), route1, 'Adding route')
    t.equal(group.routes.indexOf(route1), 0)
    t.equal(group.remove(route1), route1)
    t.equal(group.routes.indexOf(route1), -1)

    t.equal(group.add('route1'), false)
    t.equal(group.remove(), false)

    t.end()
})

test('createGroup.getRoute', function(t) {
    const group = createGroup()
    group.add(route1b)
    group.add(route)
    group.add(route0)
    group.add(route1)
    group.add(route2)
    group.add(route3)
    group.add(route4)
    group.add(route5)
    group.add(route6)
    group.add(route7)

    t.equal(group.getRoute('/my'), route0)
    t.equal(group.getRoute('/my/1'), route)
    t.equal(group.getRoute('/mys'), false)
    t.equal(group.getRoute('/my/route'), route1b)
    group.remove(route1b)
    t.equal(group.getRoute('/my/route/1'), route1)
    t.equal(group.getRoute('/my/rote/1'), false)
    t.equal(group.getRoute('/my/1/route'), route2)
    group.remove(route2)
    t.equal(group.getRoute('/my/1/route'), route3)
    t.equal(group.getRoute('/my/1/route/Name'), route5)
    group.remove(route5)
    t.equal(group.getRoute('/my/1/route/Name'), route6)

    t.equal(group.remove(), false)

    t.end()
})

// const route5 = createRoute('/my(/:page)/route/:name')
// const route6 = createRoute('/my(/:page)/route/:name')
// const route7 = createRoute('/my(/:page)/route(/:name)')

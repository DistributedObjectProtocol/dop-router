const test = require('tape')
const { createRoute } = require('../routes')

const route1 = createRoute('/my/route/:page')
const route2 = createRoute('/my/:page/route')
const route3 = createRoute('/my/:pa_ge/route')
const route4 = createRoute('/my(/:page)/route')
const route5 = createRoute('/my(/:page)/route/:name')
const route6 = createRoute('/my(/:page)/route/:name')
const route7 = createRoute('/my(/:page)/route(/:name)')

test('build', function(t) {
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

test('match', function(t) {
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

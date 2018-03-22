const test = require('tape')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Router, Route } = require('../react')
const { createRoute, createGroup } = require('../routes')

const e = React.createElement
const element = e('div', null, 'Hello World')
const html = '<div><div>Hello World</div></div>'
const htmlEmpty = '<div></div>'

function render(component) {
    component = e('div', null, component)
    return ReactDOMServer.renderToStaticMarkup(component)
}

test('<Route>', function(t) {
    const component = e(Route, null, element)
    t.equal(render(component), html)
    t.end()
})

test('<Route if={true}>', function(t) {
    const component = e(Route, { if: true }, element)
    t.equal(render(component), html)
    t.end()
})

test('<Route if={false}>', function(t) {
    const component = e(Route, { if: false }, element)
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router><Route></Route></Router>', function(t) {
    const component = e(Router, null, e(Route, null, element))
    t.equal(render(component), html)
    t.end()
})

test('<Router>...</Router>', function(t) {
    const component = e(Router, null, [
        e(Route, { if: false }, element),
        e(Route, { if: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router>...</Router>', function(t) {
    const component = e(Router, null, [
        e(Route, { if: false }, 'text'),
        e(Route, { if: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router>...default...</Router>', function(t) {
    const component = e(Router, null, [
        e(Route, { if: false }, 'text'),
        e(Route, { if: false }, 'text'),
        e(Route, null, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> basic </Router>', function(t) {
    const component = e(Router, { location: { a: true } }, [
        e(Route, { a: false }, element),
        e(Route, { a: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router location={}> basic2 </Router>', function(t) {
    const component = e(Router, { location: { a: true } }, [
        e(Route, { a: true }, element),
        e(Route, { a: false }, 'element')
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> basic3 </Router>', function(t) {
    const component = e(Router, { location: { a: true } }, [
        e(Route, { a: false }, 'text'),
        e(Route, { a: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> basic4 </Router>', function(t) {
    const component = e(Router, { location: { a: true } }, [
        e(Route, { a: false }, 'element'),
        e(Route, { a: false }, 'element'),
        e(Route, null, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> multiple </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: true }, 'element'),
        e(Route, { a: true, b: false }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> multiple and if </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, { a: true, b: false, if: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> multiple and if 2 </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, { if: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> multiple and if 2 </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, {}, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> multiple and if 3 </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, { if: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router location={}> multiple and if 4 </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, { c: false }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> regexp </Router>', function(t) {
    const component = e(Router, { location: { a: 'hello' } }, [
        e(Route, { a: new RegExp('hello') }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> regexp fail </Router>', function(t) {
    const component = e(Router, { location: { a: 'hello' } }, [
        e(Route, { a: new RegExp('lla') }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router location={}> sub </Router>', function(t) {
    const component = e(Router, { location: { a: { b: true } } }, [
        e(Route, { a_b: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router location={}> sub </Router>', function(t) {
    const component = e(Router, { location: { a: { b: true } } }, [
        e(Route, { a_c: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> sub </Router>', function(t) {
    const component = e(Router, { location: { a: { b: true } } }, [
        e(Route, { a_: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> sub double </Router>', function(t) {
    const component = e(Router, { location: { a: { b: true, c: true } } }, [
        e(Route, { a_b: true, a_c: true }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router location={}> sub double 2 </Router>', function(t) {
    const component = e(Router, { location: { a: { b: true, c: true } } }, [
        e(Route, { a_b: true, a_c: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router group={}>', function(t) {
    const location = { href: '/path/profilea/enzo' }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1 }, 'element'),
        e(Route, { is: route2 }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router group={} location={}></Router>', function(t) {
    const location = { href: '/path/profile/enzo' }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1 }, 'element'),
        e(Route, { is: route2 }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router group={} location={}></Router>', function(t) {
    const location = { href: '/path/123' }
    const location2 = { href: '/path/profile/enzo' }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location2 }, [
        e(Route, { is: route1 }, 'element'),
        e(Route, { is: route2 }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router group={}>if</Router>', function(t) {
    const location = { href: '/path/123' }
    const group = createGroup(location)
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1, if: true }, element),
        e(Route, { is: route2 }, 'element')
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router group={}>if:false</Router>', function(t) {
    const location = { href: '/path/123' }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1, if: false }, element),
        e(Route, { is: route2 }, 'element')
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router group={} location={}>if path</Router>', function(t) {
    const href = '/path/123'
    const location = { href: href }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1, if: true, href: href }, element),
        e(Route, { is: route2 }, 'element')
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router group={} location={}>if path:false</Router>', function(t) {
    const href = '/path/123'
    const location = { href: href }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1, if: true, href: 'href' }, element),
        e(Route, { is: route2 }, 'element')
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

test('<Router group={} location={}>without is</Router>', function(t) {
    const href = '/path/123'
    const location = { href: href }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { if: true, href: href }, element),
        e(Route, { is: route2 }, 'element')
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router>is={[route1,route2]}</Router>', function(t) {
    const href = '/path/123'
    const location = { href: href }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route2 }, 'element'),
        e(Route, { is: [route2, route1] }, element)
    ])
    t.equal(render(component), html)
    t.end()
})

test('<Router>is={[route1,route2]} fail</Router>', function(t) {
    const href = '/paeth/123'
    const location = { href: href }
    const group = createGroup()
    const route1 = group.add(createRoute('/path/:page'))
    const route2 = group.add(createRoute('/path/profile/:name'))
    const component = e(Router, { group: group, location: location }, [
        e(Route, { is: route1 }, 'element'),
        e(Route, { is: [route2, route1] }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

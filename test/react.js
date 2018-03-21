const test = require('tape')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Router, Route } = require('../react')
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

test('<Router location={}> multiple and if 2 </Router>', function(t) {
    const component = e(Router, { location: { a: true, b: false } }, [
        e(Route, { a: true, b: false, if: false }, 'element'),
        e(Route, { if: false }, element)
    ])
    t.equal(render(component), htmlEmpty)
    t.end()
})

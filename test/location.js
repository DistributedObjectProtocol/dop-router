const test = require('tape')
const { createLocation } = require('../location')

test('http://coinfy.com/path1/path2?testing=blabla#321', function(t) {
    const url = 'http://coinfy.com/path1/path2?testing=blabla#321'
    const location = createLocation(url)
    t.equal(location.url, url)
    t.equal(location.toString(), location.href)
    t.equal(location.origin, 'http://coinfy.com')
    t.equal(location.host, 'coinfy.com')
    t.equal(location.href, '/path1/path2?testing=blabla#321')
    t.equal(location.pathname, '/path1/path2')
    t.equal(location.protocol, 'http')
    t.equal(location.search, '?testing=blabla')
    t.equal(location.hash, '#321')
    t.equal(location.path.length, 2)
    t.equal(location.path[0], 'path1')
    t.equal(location.path[1], 'path2')
    t.equal(location.path[3], undefined)
    t.equal(Array.isArray(location.path), true)
    t.deepEqual(location.query, { testing: 'blabla' })
    t.equal(location.query.testing, 'blabla')
    t.end()
})

test('http://coinfy.com', function(t) {
    const url = 'http://coinfy.com'
    const location = createLocation(url)
    t.equal(location.url, url)
    t.equal(location.origin, 'http://coinfy.com')
    t.equal(location.host, 'coinfy.com')
    t.equal(location.protocol, 'http')
    t.equal(location.href, '/')
    t.equal(location.pathname, '/')
    t.equal(location.search, '')
    t.equal(location.hash, '')
    t.equal(Array.isArray(location.path), true)
    t.equal(location.path.length, 0)
    t.equal(location.path[0], undefined)
    t.deepEqual(location.query, {})
    t.end()
})

test('http://coinfy.com/', function(t) {
    const url = 'http://coinfy.com/'
    const location = createLocation(url)
    t.equal(location.origin, 'http://coinfy.com')
    t.equal(location.href, '/')
    t.equal(location.pathname, '/')
    t.end()
})

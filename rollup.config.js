import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import pkg from './package.json'

export default [
    // LOCATION
    {
        input: 'src/location/index.js',
        output: { file: './location/index.js', format: 'cjs' },
        external: ['dop'],
        plugins: [babel()]
    },
    {
        input: 'src/location/index.js',
        output: {
            name: 'doprouter_location',
            file: './location/index.umd.js',
            format: 'umd'
        },
        external: ['dop'],
        sourcemap: true,
        plugins: [babel(), uglify()]
    },

    // ROUTES
    {
        input: 'src/routes/index.js',
        output: { file: './routes/index.js', format: 'cjs' },
        plugins: [babel()]
    },
    {
        input: 'src/routes/index.js',
        output: {
            name: 'doprouter_routes',
            file: './routes/index.umd.js',
            format: 'umd'
        },
        sourcemap: true,
        plugins: [
            babel(),
            uglify(),
            resolve(), // so Rollup can find `route-parser`
            commonjs() // so Rollup can convert `route-parser` to an ES module
        ]
    },

    // REACT
    {
        input: 'src/react/index.js',
        output: { file: './react/index.js', format: 'cjs' },
        plugins: [babel()]
    },
    {
        input: 'src/react/index.js',
        output: {
            name: 'doprouter_react',
            file: './react/index.umd.js',
            format: 'umd'
        },
        sourcemap: true,
        plugins: [babel(), uglify()]
    }
]

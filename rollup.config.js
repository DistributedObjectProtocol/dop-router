import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import pkg from './package.json'

export default [
    {
        input: 'src/routes/index.js',
        output: {
            name: 'doprouter_routes',
            file: './routes/index.umd.js',
            format: 'umd'
        },
        sourcemap: true,
        plugins: [
            uglify(),
            resolve(), // so Rollup can find `ms`
            commonjs() // so Rollup can convert `ms` to an ES module
        ]
    },
    {
        input: 'src/routes/index.js',
        output: [
            { file: './routes/index.js', format: 'cjs' }
            // { file: './routes/index.js', format: 'es' }
        ],
        external: ['ms']
    },

    // // Module2 (this wont build ms package into umd)
    // {
    //     input: 'src/module2/index.js',
    //     output: {
    //         name: 'module2nameumd',
    //         file: './module2/index.umd.js',
    //         format: 'umd'
    //     },
    //     external: ['ms'],
    //     sourcemap: true,
    //     plugins: [uglify()]
    // },
    // {
    //     input: 'src/module2/index.js',
    //     output: { file: './module2/index.js', format: 'cjs' },
    //     external: ['ms']
    // },

    {
        input: 'src/react/index.js',
        output: {
            name: 'doprouter_react',
            file: './react/index.umd.js',
            format: 'umd'
        },
        sourcemap: true,
        plugins: [uglify()]
    },
    {
        input: 'src/react/index.js',
        output: { file: './react/index.js', format: 'cjs' }
    }
]

import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

const plugins = [
  commonjs({
    include: [ "./index.js", "node_modules/**" ],
    ignoreGlobal: false,
    sourceMap: false
  }),
  nodeResolve({
    jsnext: true,
    main: false
  })
]

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.browser, format: 'umd', name: 'fitTransform' },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: plugins.concat(babel())
  },
  {
    input: 'examples/src/runner.js',
    output: {
      file: 'examples/dist/runner.js',
      format: 'umd',
      name: 'example'
    },
    plugins: plugins
  }
]

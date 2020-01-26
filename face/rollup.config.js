import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'build/ts-out/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    resolve()
  ]
};
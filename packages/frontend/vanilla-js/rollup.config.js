import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
// eslint-disable-next-line import/no-named-as-default
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
import pkg from './package.json';

// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
};

// Base / common configs shared across the build formats
const baseConfig = {
  external: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ...Object.keys(pkg.dependencies || {}),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: {
    // Plugin provides a helpful progress bar and outputs to support debugging
    progress: {
      clearLine: false // set to false to print / retain the output in console
    },
    // typescript options are inherited from tsconfig
    typescript: {
      check: true, // runs diagnostics on the code
      verbosity: 1, // sets console message level (i.e. 2-info, 1-warn, 3-debug)
      clean: true, // generates a clean build each time vs reading from cache
      abortOnError: true,
      include: ['*.ts+(|x)', '**/*.ts+(|x)']
    },
    babel: {
      extensions: ['.ts', '.tsx'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      skipPreflightCheck: true // resolves compilation failure with use of runtime for helpers
    },
    nodeResolve: {
      isRequire: false,
      preferBuiltins: false,
      moduleDirectories: ['node_modules']
    },
    // Allows the node builtins to be required/imported.
    // https://www.npmjs.com/package/rollup-plugin-node-polyfills
    nodePolyfills: {
      include: [
        'node_modules',
        'src'
      ],
      sourceMap: true
    },
    commonjs: {
      include: /node_modules/
    },
    string: {
      include: '**/*.ejs',
    },
    replace: {
      preventAssignment: true,
      VERSION: pkg.version,
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  },
  output: {
    format: 'iife',
    globals,
    sourcemap: true,
  }
};

const inputs = {
  autosuggest: 'src/modules/autosuggest-entry-point.ts',
  category: 'src/modules/category-entry-point.ts',
  events: 'src/modules/product-events-entry-point.ts',
  recommendations: 'src/modules/recommendations-entry-point.ts',
  search: 'src/modules/search-entry-point.ts',
};

const buildConfigs = Object.keys(inputs).reduce((allConfigs, moduleName) => {
  return [
    ...allConfigs,
    {
      input: inputs[moduleName],
      output: {
        ...baseConfig.output,
        file: `dist/${moduleName}.js`
      },
      plugins: [
        nodeResolve(baseConfig.plugins.nodeResolve),
        progress(baseConfig.plugins.progress),
        string(baseConfig.plugins.string),
        commonjs(baseConfig.plugins.commonjs),
        nodePolyfills(baseConfig.plugins.nodePolyfills),
        replace(baseConfig.plugins.replace),
        typescript(baseConfig.plugins.typescript),
        json(),
        babel(baseConfig.plugins.babel),
        scss({
          outputStyle: 'compressed'
        }),
        optimizeLodashImports(),
        terser()
      ],
    }
  ];
}, []);

export default buildConfigs;

import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const configServer: webpack.Configuration = {
    entry: './server/server.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js'
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    node: {
      __dirname: true
    },
    target: 'node',
    mode: 'development',
    externals: nodeModules,
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
};

export default configServer;

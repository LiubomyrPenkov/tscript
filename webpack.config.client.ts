import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';



const configUI: webpack.Configuration = {
  entry: './client/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["ts-loader", "tslint-loader"] }
    ]
  },
  target: 'web',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'assets/index.html',
      template: path.resolve(__dirname, 'template.html')
    })
  ]
};

export default configUI;

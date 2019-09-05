const path = require('path');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
  mode: 'development',
  entry: {
    "form_observer": './src/FormObserver.js',
    "form_observer.min": './src/FormObserver.js',
  },

  output: {
    filename: '[name].js',
    // filename: 'form_observer.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new WebpackAutoInject({
      PACKAGE_JSON_INDENT: 2,
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: false,
        InjectByTag: false
      },
      AutoIncreaseVersion: {
        runInWatchMode: true // it will increase version with every single build!
      },
    })
  ],

  module: {
    rules: [{
      test: /.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: [
            ["@babel/preset-env",
              {
                "modules": false
              }
            ]
          ],
          "plugins": [
            ["@babel/plugin-proposal-export-default-from"],
            ["@babel/plugin-transform-spread"]
          ],
        }
      }
    }]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    },
     minimize: true,
     minimizer: [new UglifyJsPlugin({
       include: /\.min\.js$/,
     })]
  },

  devServer: {
    open: true
  },

  devtool: "source-map"
};
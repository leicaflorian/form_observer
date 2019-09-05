const path = require('path');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    "form_observer": './src/FormObserver.js',
    "form_observer.min": './src/FormObserver.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'form_observer',
    libraryTarget: 'umd'
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
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env",
              {
                "modules": false
              }
            ]
          ],
          "plugins": [
            ['syntax-dynamic-import'],
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

  devtool: "source-map"
};
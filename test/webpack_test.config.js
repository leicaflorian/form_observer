const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    "test": './test/testing.js',
  },

  output: {
    filename: '[name].js',
  },

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
  },

  devServer: {
    index: "test.html",
    contentBase: "./test",
    port: 5050,
    open: true
  },

  devtool: "source-map"
};
const helpers = require('./helpers')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let config = {
  devServer: {
    historyApiFallback: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'localhost:8443',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  entry: {
    'main': helpers.root('/src/main.ts')
  },
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['./src/index.html']
      }
    ]
  },
  plugins: [
    new NamedModulesPlugin()
  ]
}

module.exports = config

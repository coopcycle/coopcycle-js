const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('node-env-file')
const path = require('path')
const webpack = require('webpack')

const config = require('./config')
const { contentBase,
  host,
  url
} = require('./server.config.js')

const secretDir = path.join(__dirname, '../secret.sh')
fs.existsSync(secretDir) && env(secretDir)

const { env: { API_URL,
    GOOGLE_MAPS_API_KEY,
    STRIPE_PUBLISHABLE_KEY
  }
} = process

if (!GOOGLE_MAPS_API_KEY && !STRIPE_PUBLISHABLE_KEY) {
  throw "Please define your Stripe publishable key and your Google Maps API key as env variables"
}

module.exports = Object.assign({}, config,
  {
    devtool: 'source-map',
    entry: Object.assign(
      {
        index: [
          'react-hot-loader/patch',
          `webpack-dev-server/client?${url}`,
          'webpack/hot/only-dev-server'
        ].concat(config.entry.index)
      }
    ),
    plugins: [
      new HtmlWebpackPlugin({
        'template': path.join(contentBase, 'index.ejs'),

        // pass variables
        STRIPE_PUBLISHABLE_KEY,
        API_URL: API_URL || `http://${host}`,
        GOOGLE_MAPS_API_KEY
      }),
      new webpack.HotModuleReplacementPlugin()
    ].concat(config.plugins)
  }
)

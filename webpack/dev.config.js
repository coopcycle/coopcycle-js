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

console.log('contentBase', contentBase)

const secretDir = path.join(__dirname, '../secret.sh')
if (!fs.existsSync(secretDir)) {
  throw "Please define your Stripe publishable key and your Google Maps API key thanks in the secret.sh file"
}
env(secretDir)

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
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        API_URL: process.env.API_URL || `http://${host}`,
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
      }),
      new webpack.HotModuleReplacementPlugin()
    ].concat(config.plugins)
  }
)

const fs = require('fs')
const env = require('node-env-file')
const path = require('path')
const webpack = require('webpack')

const secretDir = path.join(__dirname, '../secret.sh')
if (!fs.existsSync(secretDir)) {
  throw "Please define your Stripe publishable key and your Google Maps API key thanks in the secret.sh file"
}
env(secretDir)

const config = require('./config')
const { url } = require('./server.config.js')

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
    output: Object.assign({},
      config.output,
      {
        // note that the output.publicPath has already a slash at the beginning
        publicPath: `${url}${config.output.publicPath}/`
      }
    ),
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ].concat(config.plugins)
  }
)

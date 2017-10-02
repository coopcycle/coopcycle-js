const path = require('path')
const webpack = require('webpack')

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

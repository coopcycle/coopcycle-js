const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const devConfig = require('./dev.config')
const { contentBase,
  host,
  port,
  url
} = require('./server.config.js')

new WebpackDevServer(
  webpack(devConfig),
  {
    compress: true,
    contentBase,
    headers: {
      // it is important to not set a wildcard for security reason
      'Access-Control-Allow-Origin': url
    },
    historyApiFallback: true,
    hot: true,
    publicPath: devConfig.output.publicPath,
    // provide less noisy output from webpack
    quiet: false,
    noInfo: false,
    stats: 'minimal'
  }
).listen(port, host, function (err, result) {
  if (err) {
    return console.log(err)
  }
  console.log(`You hot server is available here ${url}`)
})

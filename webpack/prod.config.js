const fs = require('fs')
const gzipSize = require('gzip-size')
const path = require('path')
const webpack = require('webpack')

const config = require('./config')

module.exports = Object.assign({},
  config,
  {
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      function () {
        this.plugin('done', function (stats) {
          const filename = stats.compilation.outputOptions.filename.replace('[hash]', stats.hash)
          const filepath = path.join(stats.compilation.outputOptions.path, filename)
          fs.readFile(filepath, (err, data) => {
            if (err) { console.log('error reading js bundle', err) }
            const byteSize = gzipSize.sync(data)
            const kbSize = Math.round(byteSize / 1024)
            console.log('\n\nGZIP size\n', filename + ': ~', kbSize, 'kB\n')
          })
        })
      },
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        }
      })
    ].concat(config.plugins)
  }
)

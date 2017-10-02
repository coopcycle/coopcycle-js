const path = require('path')
const webpack = require('webpack')

const ROOT_DIR = path.join(__dirname, '../')

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      path.join(ROOT_DIR, 'src/index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // See https://github.com/kenny-hibino/react-places-autocomplete/issues/103
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'coopcycle.js',
    library: 'Coopcycle',
    libraryTarget: 'umd',
    publicPath: '/build',
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}

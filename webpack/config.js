const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      path.join(__dirname, '../src/index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        include: path.join(__dirname, '../src'),
        loader: "babel-loader"
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
    path: path.join(__dirname, '../build'),
    filename: 'coopcycle.js',
    library: 'Coopcycle',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}

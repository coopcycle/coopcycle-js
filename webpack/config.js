const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const ROOT_DIR = path.join(__dirname, '../')

if (process.env.STRIPE_PUBLISHABLE_KEY === undefined || process.env.GOOGLE_MAPS_API_KEY === undefined) {
  throw "Please pass your Stripe publishable key and your Google Maps API key thanks to env variables";
}

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
    path: __dirname + '/build',
    filename: 'coopcycle.js',
    library: 'Coopcycle',
    libraryTarget: 'umd',
    publicPath: '/build',
  },
  plugins: [
    new HtmlWebpackPlugin({
      'template': 'src/index.ejs',

      // pass variables
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      API_URL: process.env.API_URL || 'http://localhost',
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    }),
    new webpack.NamedModulesPlugin()
  ]
}

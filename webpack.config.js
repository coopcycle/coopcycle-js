var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let entry = [
  './src/index.js'
];

if (process.env.NODE_ENV !== 'production') {
  entry.push('webpack-dev-server/client?http://localhost:9090'); // WebpackDevServer host and port
  entry.push('webpack/hot/only-dev-server'); // "only" prevents reload on syntax errors
  entry.push('react-hot-loader/patch');
}

if (process.env.STRIPE_PUBLISHABLE_KEY === undefined || process.env.GOOGLE_MAPS_API_KEY=== undefined) {
  throw "Please pass your Stripe publishable key and your Google Maps API key thanks to env variables";
}

var webpackConfig = {
    entry,
    output: {
        path: __dirname + '/build',
        filename: 'coopcycle.js',
        library: 'Coopcycle',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
                include: __dirname + '/src',
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
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
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        'template': 'src/index.ejs',

        // pass variables
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        API_URL: process.env.API_URL || 'http://localhost',
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: 'minimal',
        port: 9090,
        compress: true,
        hot: true
    }
};

module.exports = webpackConfig;

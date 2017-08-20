var webpackConfig = {
    entry: './src/index.js',
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
                exclude: /node_modules/,
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
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: 'minimal',
        port: 9090,
        compress: true,
    }
};

module.exports = webpackConfig;

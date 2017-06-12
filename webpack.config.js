var webpackConfig = {
    entry: ['whatwg-fetch', './src/index.js'],
    output: {
        path: __dirname + '/build',
        filename: 'coopcycle.js',
        library: 'Coopcycle',
        libraryTarget: 'var',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: __dirname + '/src',
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: 'minimal',
        compress: true,
    }
};

module.exports = webpackConfig;

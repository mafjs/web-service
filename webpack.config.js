var path = require('path');

var webpack = require('webpack');

module.exports = {
    resolve: {
        modules: [
            path.resolve(__dirname + '/package'),
            'node_modules'
        ]
    },
    entry: {
        main: 'app/Frontend/app.js',
        vendor: [
            'vue',
            'vuex',
            'loglevel',
            'maf-config',
            'universal-router',
            'history'
        ]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname + '/public/static/app/'),
        publicPath: '/public/static/app/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.html$/,
                use: [path.join(__dirname, 'build', 'vue-template-loader')]
            },
            {
                test: /\.pug$/,
                use: [path.join(__dirname, 'build', 'vue-template-loader')]
            },
        ],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
};

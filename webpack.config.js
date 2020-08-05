const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'index': './index.js',
        'example': './example.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: "vueDotnetValidator",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|dist/,
                loader: 'babel-loader'
            },
        ]
    }
};

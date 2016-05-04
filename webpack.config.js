module.exports = {
    entry: {
        'index': './index.js',
        'example': './example.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.(babel|js)$/, loader: 'babel' },
        ]
    },
    vue: {
        js: 'babel',
    }
};

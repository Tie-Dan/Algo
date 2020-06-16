const path = require('path')
const DemoWebpackPlugin = require('./demo-webpack-plugin')
module.exports = {
    mode: 'development',
    plugins: [
        new DemoWebpackPlugin()
    ],
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        // loader路径查找顺序从左往右
        modules: ['node_modules', './']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                    loader: 'syncLoader',
                    options: {
                        message: '走上人生巅峰'
                    }
                },
                {
                    loader: 'asyncLoader'
                }
            ]
        }]
    }
}
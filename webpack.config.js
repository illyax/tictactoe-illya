let path = require('path');

const webpack = require('webpack');

module.exports={
    entry:[
        'webpack-hot-middleware/client?reload=true',
        './src/index'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'API_HOST': JSON.stringify('http://localhost:3000')
            },
            'process.prod': {
                'NODE_ENV': JSON.stringify('production'),
                'API_HOST': JSON.stringify('https://tic-tac-toe-illya.herokuapp.com:3000')
            }

        })
    ],
    module: {
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['react','es2016','stage-1']
                }
            },
            {test: /\.jsx$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=1000000&mimetype=application/font-woff'
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.gif$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            }

        ]
    }
};
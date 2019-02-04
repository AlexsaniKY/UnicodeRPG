import path from 'path'
import webpack from 'webpack'

let config = {
    entry: {
		main:[
		'./main.js',
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client'
		]},
	mode: 'production',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, '../site')
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
    context: path.resolve(__dirname, '../site'),
    module: {
        rules: [
            {
                test:/\.m?js$/,
                exclude:  /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'//, {
                                // "targets": {
                                //     "browsers": [
                                //         "Chrome >= 52",
                                //         "FireFox >= 44",
                                //         "Safari >= 7",
                                //         "Explorer 11",
                                //         "last 4 Edge versions"
                                //     ]
                                // }
                            //}
                        ],
                        babelrc: false
                    }
                }
            }
        ]
    }
}

function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }
module.exports = {
    entry: "./Scripts/app.js",
    output: {
        filename: "./Scripts/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'jshint-loader'
            }
        ],
        loaders: [
        //     {
        //     test: /\.es6$/,
        //     exclude: /node_modules/,
        //     loader: "babel-loader"
        // },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
        }
    ]
    }
}
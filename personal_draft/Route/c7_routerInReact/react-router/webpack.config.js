const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports={
    devtool:"cheap-module-eval-source-map",
    entry:"./main.js",
    output:{
        path:path.join(__dirname,"/dist"),
        filename:"bundle.js"
    },
    devServer:{
        inline:true,
        port:8000
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{
                    presets:["es2015","react"]
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./index.html"
        })
    ]
}
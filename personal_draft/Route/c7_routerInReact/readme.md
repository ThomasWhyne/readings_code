- #### react environment setup  
>- npm install react react-dom react-router-dom  
> - npm insatll webpack webpack-dev-server webpack-cli 
> - npm install  :  
    babel-core   
    babel-loader   
    babel-preset-env  
     babel-preset-react  
      html-webpack-plugin  
  
- create files  
> - type nul > index.html App.js main.js webpack.config.js .babelrc  
  
- in webpack.cofig.js:  
```javascript
const path=require("path");
const path=require("webpack");
const HtmlWebpackPlugin=require("html-webpack-plugin");  
module.exports={
    //map to source code while debugging 
    devtool:"cheap-module-eval-source-map",
    //
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
    }
},
plugins:[
    new HtmlWebpackPlugin({
        template:"./index.html"
    })
]
```  
- in package.json:  
```json
{
    "scripts":{
        "start":"webpack-dev-server --mode development --open --hot"
    }
}
```  
- in .babelrc:  
```json
{
    "presets":["env","react"]
}
```  
- most error prone part is babel version, caution version   match.    
- it's wired you have to add both react-redux and redux simultaneously.
  
- 主要实现两个页面，一个是主页，一个是计数页面，当进入指定页面是，顶部的导航栏将被激活，变为红色。  
  
- #### 路由也是组件  
在react router中，路由的本质不过是嵌套视图组件，所以使用路由就像是使用其他组件那样，直接将之渲染即可。  
  

#### Common Module Definition  
CMD规范专用与浏览器端，模块的加载是异步的，模块在使用时才会加载。CMD整合了Commonjs与AMD规范的特点，在Sea.js中，所有的javascript模块都遵循CMD模块的定义规范  

- CMD基本语法  
  
```javascript
//定义暴露模块：

//无依赖模块：
define(function(require, exports, module){
    exports.xxx=value;
    module.exports=value
})

//有依赖模块：
define(function(require, exports, module){
    //引入依赖模块：同步方式
    var module_2=require("./module_2);

    //引入依赖模块：异步方式
    
    require.async("./module_3",function(m_3){

    })

    //暴露模块

    exports.xxx=value


})
```

- 引入使用模块：
```javascript
    define(function(require){
        var m_2=require("./module_2");
        var M_3=require("./module_3");

        m_1.doSomething()
    })
```

- 下载Sea.js,创建项目结构
#### Asynchronous Modules Definition  
Commonjs 规范同步加载模块，即只有模块加载完成才能执行后续操作。AMD如其名称所示，是异步的模块加载方案，允许指定回调函数。  

Node.js主要运行于服务端，模块文件一般都已存在于本地硬盘，加载速度很快，一般不用考虑非同步加载方案。  
  
但如果是浏览器环境下，要从服务端加载模块，则须采用非同步模块加载方案，因此浏览器端一般使用AMD模块加载规范。  
  
- AMD规范基本语法：    
```javascript
// 定义没有依赖的模块

define(function(){
   
   return module;

})

// 定义有依赖的模块：

define(["module_1","module_2"],function(m_1, m_2){
   
   return module

})

//引用模块
require(["module_1","module_2"],function(m_1, m_2){
    //使用模块
})
```  
- 浏览器端模块导出引入可基于手动实现，也可以使用require.jsAMD规范,示例见./AMD_manual、./AMD_require  
- 手动实现时，模块过多会触发过量请求，其次模块引入顺序有严格要求  


- require.js 是一个工具库，主要用于客户端模块管理，其模块管理遵循AMD规范，require.js的基本思想是：   
>- 通过define方法，将代码定义为模块；  
>-  通过require方法，实现代码的模块加载  
  
##### 基于require.js实现浏览器端模块加载步骤：  

1、 前往require.js或github下载require.js至项目文件夹下  
2、以define(function())、 define(["module"],function(){})方式定义无依赖模块及有依赖模块  
3、在项目主文件在IIFE中对require.config中进行模块导入配置  
4、在html文件中使用script data-main=“主文件路径” src=“require.js路径”
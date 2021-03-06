### 客户端路由概念  
  
- #### 传统导航   
传统web应用中，导航以整个web页面为单位，当在浏览器地址栏输入新URL时，通常页面请求从浏览器发往服务器，服务器响应并返回完整的HTML页面。    
浏览器受到返回文档后获取该文档引用的其他文件资源，要显示新的内容，浏览器须执行一次完整的刷新动作。  

  - #### SPA导航    
  SPA的DOM元素通常是作为SPA index页面中的shell起点，SPA模块即MV*框架，包括支持库都跟index页面一同下载，使用异步加载方案时会异步加载。  

  客户端路由是SPA实现单页面环境导航的法宝。  
  SPA应用的客户端路由负责导航控制，循序SPA显示新视图而无需刷新整个页面。  

  通过这种方式，与服务端的往返不再是必须。路由借助几种侦测浏览器位置发生改变的方法，以决定何时需要变化状态，比如进行特定的事件监听。  

只要URL发生改变，路由器会使用其配置中的某个配置项来匹配新的URL中的某部分。  
当路由器匹配上路径配置项与浏览器实际的URL时，其可以判断应该触发何种应用状态的改变。  

```text
1、 用户通过教员“manderson”请求授课时间视图  
“https://somewhere.edu/#/officerhr/manderson”  

2、路由器尝试使用配置中的某条路由对URL进行匹配：  

Path List：  
    x ----- /faculty
    x ----- /contact
    v ----- /officer/{facultyName}:
            对应功能函数 getOfficeHours()
            对应视图 、officerhr.html
    / ----- (default route)  

3、根据匹配上的路由或未匹配上的缺省路由运行相应代码  
4、为manderson显示视图，还示例会差生视图更新，但路由发生不一定会引发

```

- #### 路由及配置    
无论使用何种路由，事先都需配置，必须通过路由器配置项指定路由器在用户导航时如何响应的策略。  
每一个路由器的配置项被称为路由，通过一个个路由表示SPA中各个逻辑流程。  
典型路由配置术语：  
1、路由名称----有些路由器会给路由分配名称，有些则直接将路径作为路由标识  
2、动词----路由有时定义为匹配HTTP动词的功能名称，如get、put，通用的动词有on、when、route  
3、路径----路径是URL的一部分，用于配置路由器，以在URL与路由/路由器处理程序之间建立链接，这样允许路由器找出要执行哪一组动作，只要浏览器URL发生改变，路由器就会用配置文件中路径列表的所有路由路径跟新URL进行比较，以找出匹配项。如匹配成功则执行路由。路由路径必须是URL的合法部分，通常情况下使简单文本串，有些路由器也允许使用正则表达式。  
4、功能----可能执行的相关代码，如控制器回调，对路由做任何事情都需要执行相关代码。路由事关状态变更，而非产生视图更新。  
5、视图----  在多数情况下，如果路由器允许视图作为路由配置的一部分，则该配置多是HTML某部分的路径。当视图配置为路由的一部分是，路由器通常会处理器显示，并给出访问该驶入的功能。  
  
- #### 路由语法  
|框架、库|路径示例|
|:-:|:-:|
|angular.js|when("/routes/faculty",{...})|
|backbone.js|on("route:facultyRoute",function(){...})|  
- #### 路由配置项  

```ruby
ON MATCH OF "routes/faculty":
    FUNCTION NAME : "getListOfFaculty",
    VIEWTODISPLAY : "App/partials/faclist.html"  
    //匹配模式，运行代码，展示结果。
```  

- 路由参数  
路由参数是值路由路径中定义的变量，此特性允许我们为URL添加变量，在后续路由执行时会计算变量。  
如有时需要根据传入的不同参数显示不同的信息，参数就发挥作用了。  
1、配置带参数的路由路径  
使用路由器规定的特殊字符来定义参数：  
```
ON MATCH OF "/routes/faculty/{facultyname}"
    funciton(facultyname){
        ...
    }
```
框架中的路由参数一般以：开头。  

2、传入带有文本信息的相对URL  
如使用了路由参数，路由器可以通过路径识别那部分是参数，那部分应该逐字匹配： 
```html
    <a href="#/routes/officehr/manderson"> Dr.M.Anderson</a>
```  
大多数路由也允许多参。

- #### 缺省路由  ----资源不存在、重定向  
  
- #### 客户端路由工作机制  
> - 通过路由定义的路径来匹配URL模式  
> - 当匹配成功时执行相应代码  
>- 当路由触发时允许指定需要现实的具体视图  
>- 允许通过路由路径传递参数
>- 允许用户使用标准浏览器导航方法进行SPA导航

- #### 两种实现导航的方式：  
1、片段标识符hashTag  
```
http://www.somewhere/somepath/somefile#info
```  
路由器利用location对象以编程方式访问当前URL，包括片段标识符，并通过相应事件或poll监听URL变化，当改变发生将新的hash串来跟路由器配置中各项比对，如匹配成功则会选哪个相应代码，之后显示相应视图。  
  
2、HTML5 history  
现在大部分路由器使用片段标识符作为回退方案，主流的方案是使用history api。  
 - 基准链接  
 ```html
 <head>
     <base href="/root/"></base>
 </head>
 ```  
 不打算在连接或代码中包含完整路径时，要使html5历史api正常工作，base href必须与部署应用 base url的根路径一直，否则可能会报404错误。  
 而当用户在新生成标签下刷新页面时，将对同一内容发送请求，这样需要在服务器设置重定向，将其重定向至相同URL

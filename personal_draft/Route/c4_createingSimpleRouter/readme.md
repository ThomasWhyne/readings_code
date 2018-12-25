- PJAX结合在一起，局部更新页面和URL能极快地加载网站速度。  
- 创建一些片段式的html，在用户行为发生时下载这些片段并更新到页面上，同时对URL进行更新，同时这样的逻辑也应复制到服务端，访问更新后的url总是能读出一致的反馈。  
  
### 创建简单路由  
建立SAP的方式有很多，其中最便捷的方法是使用路由，路由的工作方式类似服务端框架中的路由，其获取URL，然后调用适当的代码来处理。加入这些代码后，URL可以截获页面上的单击锚点事件或将pushState事件传递给路由。  
下面制作一个简单的路由，其有两个方法：  
1、addRoute方法，需要一个代表URL的正则表达式，一个回调函数和一个上下文环境对象作为参数。  
  
2、handleRoute方法，仅需一个URL作为参数。  
 
需要为其实现一个简单的栈，添加路由时会将这条路由的信息入栈，当选择一个路径是，需要简单地遍历所有路由，找到相匹配的，然后指派给这个路径。  
  
```javascript
var routes=[];

function addRoute(route, callback, scope){
    var routeObj={
        route:route,
        callback:callback,
        scope:scope
    };
    routes.push(routeObj);
}

function handleRoute(path,noHistory){
    var len=routes.length, scope;
    for(var i=0;i<len;i++){
        if(path.match(routes[i].route)){
            if(routes[i].scope){
                scope=routes[i].scope
            }else{
                scope=window;
            }
            if(noHistory){
                history.pushState({},null,path)
            }
            routes[i].callback.apply(scope, [path]);
            return true;
        }
    }
    return false;
}
```  
在addRoute方法中，我们提供了一种传递上下文环境对象的方法，用以绑定给回调。  
有了这个路由，只需添加一个监听器就能让历史记录其作用：  
```javascript
    window.addEventListener("popstate",function(e){
        handleRoute(window.location.href,true);
    })
    window.router={
        handleRoute:handleRoute,
        addRoute:addRoute
    }
```  
现在历史会被自动管理，假设页面上所有的代码通过一个路由来执行。  
- 拦截事件  
为了让这个路由正常工作，需要对页面上的每一次单击进行检测，然后将其拦截。  
```javascript
document.addEventListener("click",function(e){
    if(e.target.href){
        if(router.handleRoute(e.target.href)){
            e.preventDefault()
        }
    }
})
```  
- 实现路由  
```javascript
var latinNameMap={};
var links=document.querySelectorAll(".nav-link");
var href;
//catch ajax response in memory  
var pageCache={};
for(var i=0,len=links.length;i<len;i++){
    href=normalizeLink(links[i].href)
    latinNameMap[href]=links[i].getAttribute("data-latin");
}

//browsers behave differently with links
function normalizeLink(path){
    return path.match(/([a-z_]+\.html)/)[1];
}

//handle route callbacks
function handlePage(path){
    var href=normalizeLink(path);
    birdData.changePhoto(latinNameMap(href));
    if(pageCache[href]){
        document.querySelector(".content").innerHTML=pageCache[href]
    }else{
        ajax.makeRequest(href.replace(".html","_frag.html"),
        function(xhr){
            document
            .querySelector(".content")
            .innerHTML=xhr.responseText;
        },
        this)
    }
}

router.addRoute(/[a-z_]+\.html/,handlePage)
```

接下来在lab中会实现一个简易的页面路由：  
1、我们需要搭建一个简易的服务器，使其运行在浏览器的某个端口，这需要用到http模块
2、同时我们需要在页面上发起数据请求，这需要使用XHR
3、准备一点点数据方便渲染
4、准备一个模板方便将数据统一渲染到页面上
5、在用户点击不同模块后会对应抓取不同的数据，在更新数据时同时也得注意需要同时更新URL，并将更新的URL与资源对应起来  
6、同时设置好缓存，这在用户切换页面时会变得非常有用  
那么开干吧！
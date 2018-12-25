- BOM中的对象为实现Route提供支持。   
### 关于BOM  
- BOM的核心对象是window，表示浏览器的一个实例，其既是javascript访问浏览器窗口的一个接口，同时又是浏览器端的global对象，这以为着在浏览中定义的任何一个对象、变量和函数都以window作为其全局对象，因此有权访问全局对象下的方法。   

- 全局作用域  
有两种方式可以将自定义内容挂载至window：  
```javascript
window.age=29;
var name="jack";
```   
其区别在于：直接使用window定义的属性可以使用delete操作符删除，以变量方式定义的全局变量则不能。  
**注：在chrome中可以使用delete操作符通过window删除定义的全局变量**  
  
- location对象  
location是BOM中最有用的对象之一，其提供与当前窗口加载的文档有关的信息，还提供一些导航功能。其既是window对象的属性，同时也是document对象的属性，二者引用的是同一个对象。  
location不仅保存着当前文档的信息，还将URL解析为独立的片段，可以通过不同的属性访问这些片段。  

 |属性|例子|说明|  
 |:---|:---:|:---|
 |hash|"#content"|返回URL中的hash，如不包含则返回空字符串|
 |host|"www.some.com:80"|返回服务器名称和端口|
 |href|"http://www.some.com"|返回不带端口的服务器名称|
 |pathname|"/index/"|返回URL中的目录或文件名|
 |port|"8080"|返回URL中指定的端口|
 |protocol|"https"|返回页面使用协议|
 |search|"?q=javascript"|返回URL的查询字符串，以?开头|

 - 查询字符串  
 访问查询字符串并不方便，因为location.search会返回查询字符串所有内容，需要将其解析：  
 ```javascript
 function getQueryString(){

     //substring() 方法用于提取字符串中介于两个指定下标之间的字符

     //stringObject.substring(start,stop)

     var qs=(location.search.length>0)?location.search.substring(1):"";

     items=qs.length?qs.split("&"):[];
    var item,name,value,i,args={};
     for(i=0;i<items.length;i++){
         item=items[i].split("=");
         name=decodeURIComponent(item[0]);
         value=decodeURIComponent(item[1]);
         if(name.length){
             args[name]=value
         }
     }
     console.log(args)
 }
 ```  

- 位置操作  
```javascript
location.assgin("https://www.somewhere.com")  

location="https://www.somewhere.com";

location.href="https://www.somewhere.com";
//...
//可以通过显示地为location属性指定值来改变访问路径，通过任一一种方式显式修改location属性值，浏览器的历史记录里会生成新的记录项，因此用户单击后退按钮会退回到前一个页面，要禁用这种行为可以使用replace方法

//不指定参数时，浏览器有可能从缓存中读取重新加载页面，指定参数为true则强制其从服务器加载
location.reload();
```  
### history对象  
history对象用于保存用户上网的历史记录，从窗口被打开之刻开始计算  
```javascript
history.go(1)
```  
  
- 当页面url改变时，会生成历史记录，其改变内容包括hash部分，因此设置location.hash会在浏览器中生成新的历史记录  
  
```javascript
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({page: 1}, "title 1", "?page=1");  
  //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page: 2}, "title 2", "?page=2");  
  //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({page: 3}, "title 3", "?page=3");
 //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); 
// 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); 
// 弹出 "location: http://example.com/example.html, state: null
history.go(2); 
 // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

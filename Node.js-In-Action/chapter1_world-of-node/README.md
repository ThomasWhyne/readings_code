### 第一章 欢迎来到node世界    
#### 1.5.1 构建简单的异步程序  
   > 使用文件系统模块从硬盘加载resource.json文件：  
   ```javascript
    var fs=require('fs');
    fs.readFile('./resourece.json',function(error,data){
        if(error){
            console.log(error);
        }else{
            console.log(data);
        }
    })
   ```

   这段程序要从硬盘读取resouce.json文件，当所有数据都读出后会调用回调函数，而其传参分别是error、data。  
   这个过程是在后台完成的，在该过程中主线程可以继续处理其他任务，而不必停滞等待结果。

#### 1.5.2 Hello World HTTP 服务器  
> node常被用来构建服务器，使用其创建服务器十分便捷，下面是一个简单的HTTP服务器实现，其会用Hello World相应所有请求：  
```javascript
var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end('Hello World\n');
}).listen(3000);
console.log("server running at http://localhost:3000/")
```
只要有请求过来，该段程序会激发回调函数funtion(req,res),把“HelloWorld”写入到响应中返回，这个事件模型跟浏览器中对onclick事件的监听类似。在浏览器中点击事件随时可能发生，所以设置一个函数来执行对事件的逻辑处理，而node这里提供了一个随时可以响应请求的参数。  

> 下面同一服务器的另一种写法，这样看起来request事件更为明显：  
```javascript
var server=http.createServer();
server.on("request",function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Hello World\n");
})
server.listen(3000,function(){
    console.log("server running on port:3000");
})
```

#### 1.5.3 流数据  
node在数据流和数据流动上也很强大，可以将数据流视为一种特殊数组，数组中数据分散再空间上，而数据流中的数据分散再时间上。

下面以数据流的方式来处理resource.json:  
```javascript
var stream =fs.createReadStream('./resourece.json');
stream.on('data',function(chunk){
    console.log(chunk);
})
stream.on('end',function(){
    console.log('finished');
})
```  
只要有新的数据准备好，就会激发data事件，所有数据加载完成后，会激发一个end事件，由于数据类型的不同，数据的大小可能发生改变。  

有了对读取流的底层访问，程序就可以边读取边处理。

node中也有可写数据流，当HTTP服务器有请求过来时，对其进行响应的res对象就是一种可写数据流。  

可读和可写数据流可以连接起来形成管道，就想shell脚本中的 `|`管道操作符一样。这是一种高效的数据处理方式。  

>使用http服务器将一张图片流到客户端：  
```javascript
http.createServer(function(req,res){
    console.log(res);
    res.writeHead(200,{"Content-Type":"image/jpg"});
    fs.createReadStream('./bg1-1.jpg').pipe(res);
}).listen(3000);
```
这段代码中，数据从文件中读进来，然后数据随着进来就被pipe到客户端(res)，在数据流动时，事件轮询还能处理其他事件。

### 小结
>node的特性:

+ 构建于JavaScript之上  
+ 事件触发和异步  
+ 为Data-Intensive Real-Time程序设计


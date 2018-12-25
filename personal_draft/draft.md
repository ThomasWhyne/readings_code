# 

注册一个小程序账号，开通其云服务，便可领到全套云数据库+云存储+云函数组合。

这样你就可以在2019年开年之际，轻松地开发一个经典的...个人博客系统(梗)。


这里笔者参照既有应用，使用wepy+stylus完成了几个示例页面，并通过小程序的云服务实现了一些常见的前后端数据交互，希望通过这篇文章，分享一些云服务与小程序框架的使用心得。
### 页面功能分析  
作为一名铁杆撸粉，笔者我每天刷的最多的就是掌盟这款应用，对其页面交互功能自然再熟悉不过所以这里参照的也是掌盟的页面，当然实现的效果自然没有原应用那么细腻。  
#### 1、从登录功能开始  
借用 [奇舞周刊](https://juejin.im/post/5bda7bfb6fb9a02228233f45) 文章中关于小程序登录流程的表述：  
><font face="Kaiti">“很多的业务需求都可以抽象成 Restful 接口配合 CRUD  操作，但登录流程却是错综复杂,各个平台有各自的流程, 反倒成了项目中费时间的部分, 比如小程序的登录流程。对于一个从零开始的项目来说, 搞定登录流程, 就是一个好的开始, 一个好的开始, 就是成功的一半”</font>    


在此之前想要获取小程序用户`open_id`一般得经过以下几个流程：  
>- <font face="kaiti"> <font color="red">客户端调用</font> wx.login 
>- <font color="red" face="kaiti">回调获得</font> res.code 
>- <font color="red" face="kaiti">往开发者服务端发送</font> code    
>- <font color="red" face="kaiti">携带</font> app_id & secretkey & code <font color="red" face="kaiti">向 Wechat server</font> 发送请求
>- <font color="red" face="kaiti">回调获得</font> user open_id & sessionkey</font>

而且这也还仅仅是获得，根据 [建议](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html) ,这里你获得的数据不应该直接发送至客户端，应当将session_key哈希化，设置成为自定义的用户登录态，再将哈希化后的session返回至客户端。(当然你也可以选择)![](https://user-gold-cdn.xitu.io/2018/12/20/167cbef6e6e044c6?w=440&h=458&f=gif&s=17818) 
  
 而且你需要将session存储至自己的数据库，最好是类似redis这样的内存数据库，因为你可能需要对用户的数据请求进行session。
  
而且session有可能过期，作为开发者你并不会知道session什么时候过期，所以你需要在程序启动时调用下`wx.checkSession`，既防止用户身份失效，又防止反复登录鉴权。  
  
 而且在原本的session过期后，你需要将对应用户原本存在的session从数据库中删除掉，因为已经没用了，然后再将新的session入库。
 
 而且....  
 
 <font color=#0099ff face="Kaiti">
 不想再而且下去了，现在的好消息是你可以通过云函数，直接获取调用用户的open_id,根据官方文档的表述，这是一个`天然可信任的用户登录态` 。显然之后在数据库中围绕用户建立集合文档，open_id是不二之选。</font>    
 
 所以我才头皮发麻地写下了这个登录页面：    
![用户登录功能展示](https://user-gold-cdn.xitu.io/2018/12/20/167cbe03b8028e7c?w=387&h=627&f=gif&s=2000457)  
同时也不要忘了上面提及的session,考虑一下这样的情形：  

```你将用户的open_id发送至客户端并缓存，作为用户从数据库读取数据的标识，open_id是持久有效的，所有你的用户只需登录一次，并在缓存中一直保持open_id便不需要再登录校验。看上去很美好，但如果你的用户更换一个微信账号登录，而读取数据的id标识依然会是之前缓存下来的，数据错乱就这样发生了。```  

所以在每次app launch时`wx.checkSession`是十分必要的，一旦用户更换账户登录，session会自动过期，这时可以再在云函数中调用WeChat api 发起session请求...  
并且最好不要将open_id、session_key这种关键信息发往客户端，，你完全可以在云数据库中建立一个自定义的用户标识，然后在客户端缓存。  

![](https://user-gold-cdn.xitu.io/2018/12/20/167cbfd8f4f1475c?w=1276&h=177&f=jpeg&s=36749)
 
登录流程代码如下：  
```javascript
    onLaunch (){ 
    
        const userData = wx.getStorageSync("userData")
        userData 
            ? wx.checkSession({
                success: res => this.routeTo(userData)   // route to page index     
                fail: rej=> this.routeTo()               //  route to page login
            })                   
            : this.routeTo()                             //  route to page login
    }
    routeTo (userData=null) { 
        
        if (!userData)return this.$navigate("./login")
        this.$preload(userData)
        this.$navigate("./index")
    }
    
```
跳转至 `index` 页面直接渲染用户数据即可。  
跳转至 `login` 页面，则用户 session 过期或首次登录，须登录鉴权。  

```javascript 
page: login  
    
    wx.login()
             // call login function on cloud 
        success: ({ code }) => _cloudLogin(code,(userData)=>{  
            wx.setStorageSync("userData",userData)
            this.$preload(userData)
            this.$navigate("./index")
        })    

utils:
    const cloud = wx.cloud.callFunction;
    
    const _cloudLogin= async(code,callback)=>{
        
        const {result:userData}= await cloud({name:"login",data:{code}})
        callback(userData)
        
    }

```

用户点击登录授权按钮后，调用云函数，在云函数`login`中，使用`axios`等模块向 Wecha server 发起session请求,使用`crypto`将返回的`session_key`哈希化，组织用户数据并返回给客户端。  

由于使用云数据库作后台存储，所以需要查询云数据库，判断用户是首次登录还是session过期重新登录。  
```
const db = cloud.database()
const users = db.collection("users")

//when open_id as _id:  
const {data:_id}=await users.doc(open_id).field({_id:true})get()

//when open_id as certain field  
const {data:_id}=await users.where(open_id).field({open_id:true}).get()

if(_id){
    // user existed, do the refresh stuff
}else{
    // new user, do the doc set stuff
}

```
*<font face="Kaiti">注：云数据库中可以为集合中插入的文档指定_id,为该条记录主键，默认会在该字段上建立索引，如不指定则系统自动生成_id字段。云数据库`collection.doc`查询须使用_id字段。</font>*  

![云函数doc查询](https://user-gold-cdn.xitu.io/2018/12/21/167cc9baf34bbbc1?w=408&h=275&f=jpeg&s=21096)    


#### 2、内容数据入库  
基础版云数据库提供了2048MB的数据存储空间，而且单集合最大支持50MB的JSON文件、CSV文件导入，如果你想构建一个小型的内容APP，这样的空间基本足够使用。    
  
 示例页面展示内容所使用数据全部由爬虫爬取，使用`request`+`cheerio`组合可以很方便地爬取到防爬系数不高的站点里的内容，对于`request`推荐使用`request-promise`模块，promise化请求后的回调。而对于防爬系数较高的站点，可组合使用`python`，其提供`selenium`等许多模拟浏览器运行的库，可以很方便地爬取一些动态模板渲染、需登录校验后才能获取数据的站点，配合使用`OCR`可以完成验证码校验。获得数据后使用解析工具解析、组织格式，使用fs模块完成IO，再将文件手动导入至云数据库即可。    
   
  示例页面涉及的集合主要由以下几个：  
users     | articles | comments|
-------- | ---  |--------------|----|
open_id | doc_id|comment_id ||
uuid    | author  | comment_uuid||
comments:Array|title|   comment_artid||
favored:Array |publication_date|liked_num|
unfavored:Array|favored_num|depth|
liked:Array|unfavored_num|path|
||totalcomments|parent_uuid||
|||total_replys||  
*<font face="kaiti">注：  
&ensp;&ensp;&ensp;&ensp;1、users集合为虚拟用户集合，为效果展示；  
&ensp;&ensp;&ensp;&ensp;2、users集合下多次出现Array类型字段是文档数据库的重要特性</font>*  

#### 3、点赞功能与背后的数据操作  
示例页面功能展示：  

![点赞功能](https://user-gold-cdn.xitu.io/2018/12/21/167ceb3e5884a30d?w=383&h=634&f=gif&s=1365582)  
示例页面的点赞分为对文章点赞、对用户评论点赞。二者稍有不同。  

对于一篇文章，用户可以点赞或是踩，分别会在articles对应doc_id的记录下更新`favored_num`或是`unfavored_num`字段数值。这是一个数值单向递增的操作，因为按照原应用的逻辑，一位用户在对一篇文章完成赞或是踩任一操作后，该操作不可撤销，会将对应用户对于文章的赞踩永久记录下来，用户再度浏览该篇文章时，界面需要保持之前用户操作后的样式，并且将操作禁用。  
  
 实现上述逻辑先从界面入手：  
   
   考虑到之后的内容页面可能会需要相同的功能区块，或许应当将这一区块从你的页面中抽离出来，便于之后的复用。事实上在开发一个内容较为丰富的应用时，页面功能区块类同的情形很常见，而且越到开发后期，你会发现可复用的内容越多，甚至这些封装好的模块在开发别的同类应用时，可以很方便地迁移上去。  
   
   所以这里封装了一个自定义组件：`Favored`  
   
   `Favored` 组件从文章详情页 `Detail` 接收三个数据：`favors`、`unfavors`、`status`。  
   这些数据都与页面上对应的数据直接绑定在一起：  
   ```html
   <Favored :favors.sync="favors" :unfavors.sync="unfavors" :status.sync="status" />
   ```  
   这部分数据并不属于组件自身持有，而由外界传递，当用户在组件上触发事件时，组件将事件传递给页面：`嗨，有人点了这里，需要及时更新数据哦。`   
   `wepy`中组件向上传递事件的核心方法是`$emit("eventName",[args])` ,页面接受到对应事件及参数后更新对应数据，由于数据绑定，页面上该部分数据更新后，组件随之响应，根据`status`更换标签，该标签上不再绑定事件，对应单向操作。  
   
   &ensp; &ensp;*<font face="kaiti">注：框架细节具体参见[文档](https://tencent.github.io/wepy/)，此处不赘述</font>*    
  
  
- 大部分网站都有不止一个页面，对用户而言，页面跳转是一件痛苦的事情，那么应当如何避免页面跳转加载，来提升用户体验呢？ 
- PJAX  
将pushstate与ajax结合使用：ajax负责更新内容，pushstate负责更新URL 
- 为什么不会仅仅使用ajax？  
当页面重新加载时，可以只通过创建一个ajax请求就返回这部分更新的html，然后将其插入dom，这样可以达到效果，但会破坏网站的可用性。  
  
```html
    <ul>
        <li><a href="somewhere.html"></a></li>
    </ul>
```  
通常上面这样的结构很清楚，一个链接指向对应的文件，这些文件的URL实际上是界面上非常重要的组成部分。用户通过单击链接就能浏览对应的网页，或许之后可以再通过输入"http://somedmain.com/somewhere.html"再度访问该页面。而且在移动端一个常见的功能是用户随时可能转发关于该网页的链接，将其分享到朋友圈，而其他人可以单击分享的链接，浏览该页面。  
 
但当开发人员考虑使用javascript和ajax更新页面时，会使之与一些网站的基本用户交互规则脱节。  

如果通过单纯触发事件-->拉取数据-->替换更新内容这样的方式处理，那么当前资源很有可能与URL对应不上，因为URL并没有随之更新。  
使用h5浏览器历史API的好处是可以保持链接的正确性。  
  
#### 浏览器历史API  
浏览器历史是一个很大的栈，其存储了当前标签页的访问历史。  
当用户浏览网站时，其实就是往历史栈中再pushstate，当其单击后退按钮时，就像移动一对卡片一般，向后移一张。当其复制地址栏或点击分享复制URL时，会取得其当前所在位置的一张快照，url指向栈中的某个状态，并最终指向一个资源。  
浏览器历史API为我们提供两个新的方法去操作这个栈：  
pushState和replaceState。  
  
pushState将新的状态入栈，并将之前的栈清空，replaceState会替换掉当前栈，并不影响其他栈中的状态。  
   
通过单独使用pushState可以确保用户分享或加入书签的链接能够正确反映页面的状态，但同时也失去了对于前进后退的处理。  
  
  事实上使用pushstate时，单击浏览器后退按钮并不会触发页面加载，除非后退足够多次数，直至某个不是有pushstate添加的状态。  
    
因此，浏览器提供了popstate事件，其将在用户因使用后退或前进按钮而导致状态堆位置发生改变时及时触发。  
  
#### 用pushState改变历史   
现在创建一个简单应用接口，点击链接，页面上数值增加。  
 
这个功能很容易实现，但点击的同时需要更新url，以便单击后退按钮时能够将数值减小。    
  
首先，使用pushState将新的状态入栈。  
  
**pushState接受三个参数：**  
  - 一个代表状态的对象  
  - 一个标题  
  - 一个url  
  这里的标题参数并非指窗口标题，其是独立的。目前没有任何主流浏览器会处理标题参数。  


然后，监听popstate事件。因为在pushState时已经将数量记录到状态对象参数内，所以可以在popstate事件中使用，由于popstate还会在页面加载时被触发，而此时触发的popstate事件状态对象参数还是null，所以需要在事件处理内验证参数。  
此外还添加了一个setNumFromUrl函数，demo中并没有服务端代码，所以需要确保链接能指定对应数字。
[参见示例页面](index.html)   
  
#### 浏览器对pushState的支持程度和pollyfill  
并非所有移动浏览器都兼容pushState，降级兼容的思路是当history对象上不存在pushState方法时，使用location.hash，也即是URL中#后面的值，改变这个值会创建一个历史记录条目，并可以通过不断检查URL是否发生变化来模拟popstate事件，现在需要对上个例子中的代码作出补全，如果浏览器不支持pushstate，则使用location.hash,其url会像是这样：history.html#4  
```html
<script>
    var userHash=false;
    var userExp=/#[0-9]+/;
    if(!history.pushState){
        userHash=true;
    }
</script>
```    
  
下一步将整合所有用来更新html的代码至handleStateChange函数内，这些代码同时会更新forward链接中href的值，一遍赋值该链接中的地址后在也能正常工作。  

```javascript
    function handleStateChange(count){
            number.innerHTML=count;
            document.title="Number"+count;
            link.href="?num="+(parseInt(count,10)+1);
        }
```  
然后更新setNumFromUrl函数，使其既能支持查询字符串，又能支持hash URL。  
  
#### 升级和降级网址  
同时需要思考的一个问题是:有支持pushState的用户从hash URL中进入页面，有不支持pushState的用户从popstate url进入页面，这样的情况如何处理？    
一位使用不支持pushState浏览器的用户从  
file:///E:/readings_code/personal_draft/Route/c3_avoidingPageRoute/index.html?num=2进入页面后，点击链接其url会变成...num=2#3  
可以在这种情况下设置刷新页面来保持路由一致。 
 
 而如果支持pushState的用户从hash url进入页面，此时会触发popstate，当然首先是完成嗅探，当页面首次入栈时其state对象为null，此时一定会执行setNumfromUrl，在locatin.search中存在？query string则判断当前为state url，而如果location对象上存在hash则判断当前为hash url，此时完成路由替换即可，提及替换则使用replaceState是合适的方式，不用将新的state入栈。  
   
```javascript
    function setNumFromUrl(){
        //case 1 : if there is  a query string, then handle it
        if(location.search){
            var match=location.search.match(/([0-9])+/);
            if(match){
                //if pushState does't work, need to redirect // the hash version  
                if(user.hash){
                    location="history.html#"+match[1];
                }else{
                    //supports pushState
                    document.geteElementById("number).innerHTML=match[1];
                    document.title="Number"+match[1]
                }
            }
        }else if(location.hash){
            //case 2: no query string but with hashtag  
             
            var match=location.hash.match(userExp);
             document.geteElementById("number).innerHTML=match[1];  

            document.title="Number"+match[1]
            if(!userHash){
                //support pushState, need to update url
                    history.replaceState({count:match[1],null,"history.html?num="+match[1]})
            }
        }else{
            //default state
            document.geteElementById("number).innerHTML=1;  

            document.title="Number"+1；
        }
    }
```  
对于不支持pushState的用户，需要不断检测url的变化，一旦用户点击后退按钮，就能立即检测到，为减少开销，旨在必要时进行检查。  
```javascript
function handleStateChange(count){
    number.innerHTML=count;
    document.title="Number"+count;
    link.href="?num="+(parseInt(count,10)+1);
        }
if(!userHash){
    window.addEventListener("popstate",function(){
        if(e.state && e.state.count){
            handleStateChange(e.state.count);
        }else{
            setNumFromUrl()
        }
    })
}else{
    // if it dose not support popstate,the first popstate is not called,
    // we have to call setNumFromUrl manually
    setNumFromUrl();

    //and keep in mind only change the url when it is actually changed
    var oldHash=location.hash;
    setInterval(function(){
        var match;
        if(window.hash!==oldHash){
            match=location.hash.match(userExp);
            oldHash=location.hash;
            if(match){
                handleStateChange(match[1]);
            }
        }
    },100)
}
```

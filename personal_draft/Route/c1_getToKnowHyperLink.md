#### Get to know HyperLink  
- 2.6.1  
超链接指在html文件的图片或文字中添加链接变迁，当浏览器单击该图片或或文字时，会被立即引导至另一位置。  
  
  该位置可以是网页、BBS、FTP，甚至可以供浏览者打开或下载的文件，也可以直接链接至Email邮箱。  
  ```html
  <a href="#"><a/>
  ```  
  ### - href属性设置的是该链接所要链接的网址或文件路径。  
  根据路径的不同，网页中的超链接一般可分为：内部链接、外部链接、锚点链接。    
- 内部链接  
内部链接所链接的目标一般位于同一个网站中，对于内部链接而言，可使用相对路径或绝对路径。  

  相对路径指url中没有指定超链接协议或互联网位置，仅指定相对位置关系。  

  示例：  
  如A、B位于同一目录下，直接在指定B文件即可；如B位于A下级目录，则路径为sub/B；如B位于A上级目录，则使用../B，“..”符号表示父级目录。还可以使用/来定义站点根目录。如/B.html表示链接到站点跟目录下的B.html文件。  


- 外部链接  
外部链接所链接的目标一般为外部网站目标，一般须指定链接所使用的协议和网站地址。  
- 锚点链接是一种特殊的链接方式，实际是在内部或外部链接的基础上增加锚点标签后缀(#标签名)。如："http://www.mysite.com/nav/index.html#anchor",表示跳转至index.html页面中标签为anchor的锚点位置。  
  
### -target熟悉设置链接的网页打开方式，有以下几种：  
- target="_blank", 链接的目标网页在新窗口中打开；  
- target="_parent", 链接的目标网页会在当前窗口打开，如在框架网页中则会在上一层框架打开网页；  
- target="_self", 链接的目标网页会在当前运行的窗口打开，为默认值； 
- target="_top", 链接的目标网页会在浏览器窗口打开，如果有框架则网页中国所有框架都会被删除  
- target="窗口名称"， 链接的目标网页会在有指定名称的窗口或框架中打开

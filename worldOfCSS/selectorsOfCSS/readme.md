- #### css选择器的类别：  
<ol>
    <li> <strong>简单选择器</strong> ： <i>通过元素名称、类名、id选择元素、通配符</i></li>
    <li> <strong>属性选择器</strong> ：<i>通过元素的属性、属性值匹配一个或多个元素</i></li>
    <li> <strong>伪类选择器</strong> : <i>匹配处于确定状态的一个或多个元素，如指针悬停、选中未选中、父元素的第几个子节点</i></li>
    <li> <strong>伪元素选择器</strong>：<i>匹配处于相关的确定位置的一个或多个元素，如段落的首字首行、或在某个元素前后</i></li>
    <li><strong>组合选择器</strong>：<i>组合选择功能，如选择某元素直系子节点，或相邻子节点</i></li>
    <li><strong>多重选择器</strong>: <i>以逗号分隔的多重选择规则</i></li>
</ol>

- 属性选择器  
特殊类型选择器，通用语法由[]组成，其中包含属性名称以及可选的属性值。属性选择器根据其匹配属性值的方式分为两类:  
>存在和值属性选择器  
>子串值选择器  
      
- #### 存在和值属性选择器：    
- `[attr]`:该选择器选择所有包含特定属性的元素  
- `[attr=val]`:仅选择attr被赋值val值的元素  
- `[attr~=val]`：选择具有attr属性的元素，且val值是attr所有被空格分割的值中的一个  
  
- #### 子串值选择器:(亦称正则选择器)  
  
- 1 、 [attr |= val ]， 选择attr属性值等于val的元素，或值以val开头  
- 2、 [attr ^= val ]， 选择attr属性值以val开头项  
- 3、 [attr $= val ], 选择attr属性值以val结尾项  
- 4、 [attr *= val ], 选择attr属性值包含val项  
  
- #### 伪类选择器  
一个css伪类是以冒号作为前缀，添加到一个基础选择器末尾的关键字，用以将样式在特定状态下呈现至某个元素。  
  
- **A**  
`:active`   
>---匹配被用户激活的元素，以鼠标交互时，其代表用户按下按键至松开按键的时间。伪类执行顺序为LVHA。  
  
- **C**  
`:checked`  
>:checked表示任何处于选中状态的 `<input type="radio | checkbox | ">` 或 `<select>元素中的<option>项`。通过伪类可以配合max-height轻松实现元素文本伸缩。  
>[css世界中有关于应用实例，其中还设计两个关键的css部分：clip属性，以及 ~ 选择器](https://demo.cssworld.cn/3/3-2.php)  
  
- **D**  
`:default`  
>该选择器一般应用于表单元素之上，用于表示一组表单元素的默认选项。  
```html
    <div class="default">
        <div>：default用于指定默认选项的样式</div>
        <input type="checkbox" id="china" checked>
        <label for="china">中国</label>
        <input type="checkbox" id="japan">
        <label for="japan">日本</label>
        <input type="checkbox" id="korea">
        <label for="korea">韩国</label>
    </div>
```  
```css
    input:default+label{
        color: red;
    }
```  
- `:dir()` ---用于指定文本方向，效果类同html dir属性， 但尚处草案阶段。   
- `:disabled` ---效果类同:default， 指定表单被禁用项的样式，与之对应的有:enabled。  
  
- **E**  
- `:empty` ---匹配不包含子元素的节点， 子元素可以是元素节点或文本。 ie9以上支持。   
  
- **F**  
- `:first` --- 用于打印时选择首页，草案，尚未支持。  
- `:first-child` ---用于选择一组兄弟元素中的第一个元素  
- `:first-of-type` --- 兄弟元素中同类型的首个元素  
- `:fullscreen` --- 选择当前全屏元素， 使用须带浏览器前缀，ie11以上支持，不推荐使用  
- `:focus` --- 表获取焦点的元素，触摸及ta皆可触发，仅适用于焦点元素，如须聚焦包含焦点元素的元素，使用`focus-within`
- `:hover` --- 适用于用户指示设备虚指的一个元素，hover可应用于任何伪元素上，该伪类对触摸屏用户不友好。  
>使用`:hover`可以创建复杂的嵌套机制，常用的下拉按钮可以通过hover实现  
  
- **I**  
- `:in-range` --- 输入值超范围时选择表单元素  
- `:invalid` --- 用于设置输入表单内容不合法时选取元素    
  
- **L**  
- `:last-of-type` --- 选择父元素中的最后一个给定子元素，同时也会选择父元素的子元素的最后一个给定元素
```html
    <style>
        div p:last-of-type{
            color:darkblue;
        }
    </style>

    <body>
        <div>
            <p>不会被选中</p>
            <p>会被选中</p>
            <span>
                <p>会被选中</p>
            </span>
        </div>
    </body>

``` 
  
- **N**
- `:not()` --- 配合选择器取否  
- `:nit-child` --- 以an+b形式选取当前元素所有子元素  `:nth-last-child`是其反序计算  
- `:nth-of-type` --- 以an+b形式选取当前元素兄弟元素 `:nth-last-of-type`是其反序计算  
  
- **O**  
- `:only-child` --- 选取给定元素为当前元素唯一子元素， 且当前元素子元素包含单独子元素项同样会被选取  
```html
    <style>
        div:only-child{
            color: red;
        }
    </style>

    <body>
        <div>
            <i>选取</i>
        </div>
        <div>
            <i></i>
            <span></span>
            不被选取
        </div>

    </body>
```  
- `:only-of-type` --- 代表任意给定元素，且给元素没有相同类型兄弟元素  
- `:optional` --- 选择任何没有required属性的input、select、或textarea元素，对应有`:required`  
- **T**
-`:target` --- 一个非常强大的伪类选择器， 使用该选择器会将当前url哈希串部分与当前页面元素id匹配  
```
如 http://www.somewhere.com#target-1会匹配
<p id="target-1"></p>  
```  
[该示例使用:targe伪类t实现了slider功能](https://github.com/madmurphy/takefive.css/)  
  
- ### 伪元素选择器  
伪元素选择与伪类选择类似，二者不同在于，伪类依据某种状态选择元素， 而伪元素则选择元素的某个位置设置样式。  
  
- `before`  
为给定元素创建子元素，其将成为给定元素的第一个子元素，通常搭配[content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content)属性为一个元素添加修饰性内容。  
设定的伪元素默认为行内元素。伪元素一般不能应用于替换元素如img或br上。    
  
- ### 组合选择器  
|名称|组合器|选择内容|
|:--:|:--:|:--:|
|选择器组|A,B|匹配满足A和/或B的任意元素|
|后代选择器|A B|匹配B元素，B是A的后代节点|
|子选择器|A>B|匹配B元素， B为A的直系子节点|
|相邻兄弟选择器|A+B|匹配B元素，B为A的相邻兄弟节点|
|通用兄弟选择器|A~B|匹配B元素， B为A的任一兄弟节点|


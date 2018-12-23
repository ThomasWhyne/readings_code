- ES6模块设计思想是尽量静态化，在编译时就确定模块的依赖关系，以及输入和输出的变量。  
- Commonjs和AMD模块都只能在运行时才能确定上述一些东西。比如CommonJS模块就是对象，输入时必须查找对象属性。  
- ES6模块化中， export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。  
```javascript
//module.js
var basicNum=0;
var add=function(a,b){
    return a+b;
}

export {
    basicNum,
    add,
}

//another file.js 
import { basicNum, add } from "./module";
```
使用`import`命令时，导入方需要明确知道模块中输出的变量名，否则无法成功导入。  
为了使用方便，可以使用`export defalut`命令，为模块指定默认输出。  
```javascript
    export default function(){
        return "ThomasWhyne";
    }

    import customName from "./module";
```
当模块指定了默认输出时，导入方可以为其指定名称。  
  
#### ES6模块与Commonjs的差异：  
1、 Commonjs模块输出的是一个值的拷贝，ES6模块输出的是值的引用，./commonjs.js与es6_module.js  
2、Commonjs模块是运行时加载，es6模块是编译时输出接口。  
  
  commonjs加载的是一个对象，即module.exports属性，该对象只有脚本运行时才会生成，而ES6的模块不是对象，其对外的接口只是一种静态定义，在代码静态解析阶段就会生成。  
    
    ES6的模块运行机制与commonjs不同，其是一种动态引用，并不会缓存值，模块里的变量绑定其所在的模块。  
  
#### ES6-Babel-Browserify使用  
ES6模块在服务端、客户端都为得到很好的支持，须使用babel将其编译为es5代码，使用browserify编译打包js。  

1、安装babel-cli、brwoserify  
2、安装babel-preset-es2015  
3、preset预设，将es6转换成es5的所有插件打包  
4、定义.babelrc文件  
5、定义模块代码  
6、使用babel划分es6代码编译为es5代码  
7、使用browserify编译js为客户端可运行文件
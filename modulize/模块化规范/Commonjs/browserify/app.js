var uniq=require("uniq");
var arr=require("./mymodule").arr;
var uniq_arr=uniq(arr);
window.document.getElementById("root").innerHTML=uniq_arr.toString();
//直接将该文件导入客户端会报错
//Uncaught ReferenceError: require is not defined
//Uncaught ReferenceError: require is not defined at app.js
//须使用browserify browserify/app.js -o browsertify/bundle.js
//将文件编译打包，再从客户端引用打包后的js文件

var count=require("./mymodule").count;
var increase=require("./mymodule").increase;

console.log(count);
increase();
console.log(count)

//>>>3 3   
//这里所引入的是mymodule模块中exports对象上指定的输出内容的拷贝，  
//引入完成后，如果是原始类型值，直接拷贝该值并将其写入缓存，
//模块内部的改变不会影响既有引入原始类型值

var counter=require("./mymodule").counter;
var increment=require("./mymodule").increment;

console.log(counter.value);
increment();
console.log(counter.value)
//3 4 
//但如果引入内容是一个复杂类型，引入的则是其引用，  
//后续模块内部执行的代码对该对象的改变会影响引入结果
var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

// fs.readFile("./client/data.json",function(err,data){
//     if(err)throw err;
//     console.log(data.toString())
// })
var filePath = "./client/data.json";
var type = path.basename(filePath);
console.log(type)
console.log(mime.getType(type))
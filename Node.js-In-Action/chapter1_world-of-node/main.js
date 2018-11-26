 var fs=require('fs');
// fs.readFile('./resourece.json',function(error,data){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(data);
//     }
// })
// console.log('jack');

 var http=require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{"Content-Type":"text/plain"});
//     res.end('Hello World\n');
// }).listen(3000);
// console.log("server running at http://localhost:3000/")

// var server=http.createServer();
// server.on("request",function(req,res){
//     res.writeHead(200,{"Content-Type":"text/plain"});
//     res.end("Hello World\n");
// })
// server.listen(3000,function(){
//     console.log("server running on port:3000");
// })

// var stream =fs.createReadStream('./resourece.json');
// stream.on('data',function(chunk){
//     console.log(chunk);
// })
// stream.on('end',function(){
//     console.log('finished');
// })

http.createServer(function(req,res){
    console.log(res);
    res.writeHead(200,{"Content-Type":"image/jpg"});
    fs.createReadStream('./bg1-1.jpg').pipe(res);
}).listen(3000);

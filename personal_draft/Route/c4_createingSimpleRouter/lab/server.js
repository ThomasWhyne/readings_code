var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");


function send404(response){
    response.writeHead(404,{"content-type":"text/plain"});
    response.write("Error 404: resource not found");
    response.end();
}

function sendFile(response, filePath, fileContents){
    response.writeHead(200,{
        "content-type":mime.getType(path.basename(filePath))
    });
    response.end(fileContents);
}

function serverStatic(response, absPath){
    fs.exists(absPath,function(exists){
        if(exists){
            fs.readFile(absPath,function(err,data){
                if(err){
                    send404(response);
                }else{
                    sendFile(response,absPath,data);
                }
            })
        }else{
            send404(response);
        }
    })
}

var server=http.createServer(function(request, response){
    var filePath=false;
    if(request.url == "/"){
        filePath="client/index.html";
    }else{
        filePath="client"+request.url;
    }
    var absPath="./"+filePath;
    serverStatic(response, absPath);
})
server.listen(3000,function(){
    console.log("server created successfully on port 3000");
})
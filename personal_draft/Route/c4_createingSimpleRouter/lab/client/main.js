var root=document.getElementById("root");
// var template=document.getElementById("template");
var links=document.querySelectorAll(".nav_link");
var linkMap={};
var tempExp=/(?:\{\{)([A-z][^\s\}]+)(?:\}\})/g;
var pages={};
var Routes=[];

function addRoute(route, callback){
    var routeObj={
        route:route,
        callback:callback
    }
    Routes.push(routeObj)
}

function handleRoute(path, noHistory){
    var len=Routes.length;
    for(var i=0;i<len;i++){
        if(path.match(Routes[i].route)){
            if(!noHistory){
                history.pushState({},null,path);
            }
            return Routes[i].callback(path.replace(/(\.html|\.json)/, ".json"));
        } 
    }
    
}

function handlePage(href){
    if (!pages[href]) {
        hidePage();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var data = JSON.parse(xhr.responseText)
                    console.log(data)
                    var contentHolder = document.createElement("div");
                    contentHolder.innerHTML = renderTemplate(template, data);
                    root.appendChild(contentHolder);
                    pages[href] = contentHolder;
                } else {
                    console.log(xhr.status);
                }
            }
        }
        xhr.open("get", href, true);
        xhr.send(null);
    } else {
        hidePage()
        pages[href].style.display = "block";
    }   
}

function renderTemplate(template,data){
    return template.replace(tempExp,function(fullMatch, capture){
        if(data[capture]){
            return data[capture]
        }else{
            return fullMatch;
        }
    })
}

function hidePage(){
    for(var page in pages){
        pages[page].style.display="none";
    }
}

for (var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        var href = e.target.getAttribute("data-url");
        e.preventDefault();
        handleRoute(href);
    })
}

window.addEventListener("popstate",function(e){
    handleRoute(window.location.href,true);
})

addRoute(/[a-z]+_[a-z]+(\.html|\.json)/, handlePage);
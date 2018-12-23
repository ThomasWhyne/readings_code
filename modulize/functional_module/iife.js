(function(window,$){
    const data="my data";
    const _foo=function(){
        $("#root").css({
            "height":"50px",
            "width":"50px",
            "border-radius":"10px",
            "background-color":"aqua"
        })
        return data;
    }
    const bar=function(){
        return _foo();
    }
    window.myModule={
        bar
    }
})(window,jQuery)
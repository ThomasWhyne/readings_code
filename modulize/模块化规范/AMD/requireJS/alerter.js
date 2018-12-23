define(["dataService","jquery"],function(dataService,$){
    var name="ThomasWhyne";
    var style={
        width:"50%",
        height:"200px",
        margin:"20px auto",
        "background-color":"aqua",
        "border-radius":"10px",
        "text-align":"center",
        "line-height":"200px"
    }
    function showMessage(){
        $("#root").html(dataService.getMessage()+", by"+name);
        $("#root").css(style);
        
    }
    return {
        showMessage,showMessage
    }
})
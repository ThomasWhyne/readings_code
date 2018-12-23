(function(dataService){
    var name="ThomasWhyne";
    function showMessage(){
        alert(dataService.getMessage()+", by"+name);
    }
    window.alerter={
        showMessage:showMessage
    }
})(window.dataService)
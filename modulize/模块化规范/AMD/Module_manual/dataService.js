(function(window){
    var message ="hello, Module_manual";
    function getMessage(){
        return message.toUpperCase();
    }
    window.dataService={
        getMessage:getMessage
    }
})(window)
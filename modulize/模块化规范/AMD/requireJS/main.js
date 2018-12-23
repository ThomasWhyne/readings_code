(function(){
    require.config({
        baseUrl: "./",
        paths:{
            alerter:"./alerter",
            dataService:"./dataService",
            jquery:"./lib/jquery"
        }
    })
    require(["alerter"],function(alerter){
        alerter.showMessage()
    })
})()
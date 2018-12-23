define(function(require, exports, module){
    var module_2=require("./module_2");
    function show(){
        console.log("from module_3 :"+module_2.message);
    }
    module.exports.show=show;
    require.async("./module_1.js",function(m_1){
        m_1.show();
    })
})
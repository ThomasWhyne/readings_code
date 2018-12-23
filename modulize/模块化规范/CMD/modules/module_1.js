define(function(require,exports,module){
    var data="HELLO, CMD";
    function show(){
        console.log(data)
    }

    module.exports.show=show;
})
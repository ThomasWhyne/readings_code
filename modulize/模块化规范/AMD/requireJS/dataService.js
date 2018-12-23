define(function () {
    var message = "AMD MODULE WITH REQUIRE.JS";
    function getMessage() {
        return message;
    }
    return {
        getMessage: getMessage
    }
})
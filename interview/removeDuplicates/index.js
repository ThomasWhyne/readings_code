var str='123545456897412321564561156484512131213156489781123156454564651232';
var arr=[].slice.call(str);  

function removeDuplicate(arr){
    var buffer = new Map;
    return arr.filter(item => !buffer.has(item) && buffer.set(item))
}

console.log(removeDuplicate(arr))

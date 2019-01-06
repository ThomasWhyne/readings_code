#### description  
- find all duplicate items in a given array  
  
#### solutions 
  
- 1、use obj buffering items selected and compared in nested for loop  
```javascript
 // store literally
function duplicates(arr){
    var obj = {};
    var buffer = [];
    var len = arr.length;
    for (var i in arr) {
        var num = arr[i];
        // always remember that for in loop represents index as string
        var j = Number(i) + 1;
        for (; j < len; j++) {
            if (arr[j] === num) {
                if (!obj[num]) {
                    obj[num] = num;
                    buffer.push(num);
                }
            }
        }
    }
    return buffer;
}

// set count flag
function duplicates(arr){
    var obj={};
    for(var i in arr){
        var num=arr[i];
        if(obj[num]){
           obj[num]+=1； 
        }else{
            obj[num]=1;
        }
    }
    return Object.keys(obj).filter(function(item){
        if(obj[item]>=2)return Number(item);
    })
}

```    
[specification on Number](https://tc39.github.io/ecma262/#sec-numbers-and-dates)
  
- 2、 index compare  
> if an item's first index does not equel to its last index, then the item duplicates, then only buffer those of which index equal to its first index. Or with buffer array invoved, only pushing those not in buffer is just fine.   
- [Array.prototype.indexOf( searchElement[ ,fromIndex])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)  
>The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.  
- [...lastIndexOf( searchElement[ ,fromIndex])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)  
>The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
```javascript
    //2.1 using buffer array:
function duplicates(arr) {
    var index=0,
        len=arr.length,
        buffer=[];
    for(;index<len;index++){
        var num=arr[index];
        if(arr.indexOf(num)!==arr.lastIndexOf(num)&&buffer.indexOf(num)===-1){
            buffer.push(num);
        }
    }
    return buffer;
}  

 //2.2 functional


 function duplicates(arr) {
   return arr.filter(function(item, index,innerArr){
        return index!==innerArr.lastIndexOf(item)&&index===innerArr.indexOf(item);
   })
}
    
```   
  

  
- 3、 use negative flag  
> this was borrowed from leetcode python: finding all duplicates in an array  
> original definition listed as follows:  
>- 1、 given an array of integers, items of which should be:` 1 <= item <=n`, n is the length  
> - 2、 duplicate items appear at most twice     
  ------  
  the basic idea of this method is that if one item duplicates in array, then as index they points to the same place in it.so when inside of the while loop, if the absolute item as index points to a nagetive value, it suggests this item is a duplictaed one, since all the item in array >=1.  

the limitations here are obvious, items in array cannot be neagtive, indexing was based on this,plus, value of item should be less than or equal to the length.  

```javascript
    function duplicates(arr){
        var index=0,
            len=arr.length,
            buffer=[];
        while(index<len){
            var num=Math.abs(arr[index]);
            index+=1;
            // original method was num-1, since if item = n, indexing will overflow
            if(arr[num]<0){
                if(buffer.indexOf(num)===-1){
                    buffer.push(num)
                }
                // if arr[num] is postive, it should be set as negative, otherwise just continue
                continue;
            }
            arr[num]=-arr[num];
        }
        return buffer;
    }
```   
  
- 4、 use reduce  
[Array.prototype.reduce(reducer(accumulator, currentValue, index, sourceArr)[, initialValue])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
> The reducer function takes four arguments:
>Accumulator (acc)
>Current Value (cur)
>Current Index (idx)
>Source Array (src)
>Your reducer function's returned value is assigned to the accumulator, whose value is >remembered across each iteration throughout the array and ultimately becomes the final, single >resulting value.  
```javascript
    function duplicates(arr) {
    return arr.reduce(function(accu,curr,index,sourceArr){
        if(sourceArr.indexOf(curr)!==sourceArr.lastIndexOf(curr)){
            if(accu.indexOf(curr)===-1){
                accu.push(curr);
            }
        }
        return accu;
    },[])
}

console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))
```
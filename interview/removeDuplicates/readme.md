- #### description     
remove duplicate item in an array.  
     
       
  <i>to make it simpler, array was represented as [].slice.call(str) or str.split()</i>   


  [String.prototype.split(separator[, limit])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) ：  
  >separattor could be a string or regexp (useful when desired value separated by various symbol), when limit time is met, spliting stops. 
    
- 1、 double loop   
> double loop has several variants, most of them follow the rule that linear comparison. 
```javascript
    // 1.1 using buffer array, 
        // looping original outside,
        // looping buffer insied,
        // once inner loop item equal to outter loop item, break,
        // so identical item located in both array,
        // outer loop only push the current buffer item not equal to current outer arr item
    function removeDuplicates(arr){
        var buffer=[];
        for(var i=0;i<arr.length;i++){
            for(var j<0;j<buffer.length;j++){
                if(arr[i]===buffer[j])break;
            }
            if(buffer[j]!==arr[i]){
                buffer.push(arr[i])
            }
        }
    }
    
    //1.2 or if the inner loop runs full through, suggestting no idential item detected
    if(j===buffer.length)buffer.push(arr[i]);
```  
- 2、indexOf : the idead is that is if buffer doesn't contain item in arr, then push  

- 3、sort : main idea is always pushing the first item before hand, and store the current item of arr  
```javascript
    function rd(arr){
        var flag, buffer=[];
        arr.sort()
        for(var index=0;i<arr.length;index++){
            if(!index || arr[index]===flag){
                buffer.push(arr[index])
            }
            flag=arr[index]
        }
        return buffer;
    }
    // this was based on sorting, thus only have to concern first item and comparing curren one with previous one
```    
  
 - 4、 use buffer object:
 ```javascript
  var obj = {};
    var buffer = []
    for (var i in arr) {
        if (!obj[arr[i]]) {
            obj[arr[i]]=true;
            buffer.push(arr[i])
        }
    }
    console.log(obj)
    return buffer;
 ``` 
 
#### ES6  
  - filter  
  ```javascript
    // their outcomes are different, lastIndex iterates index from end to front, so the one which meets the condition is either an unique item or the last duplicate  
    return arr.filter((item,index,Arr)=>index===Arr.lastIndexOf(item))
    return arr.filter((item, index, Arr) => index === Arr.indexOf(item))
    
    // variant remove after sorted, remember when sorted only compare current with previous
    return arr.sort().filter((item, index, sortedArr) => !index || item!==sortedArr[index-1])

    // variant filter with obj
     var obj = {};
    return arr.filter(item => obj.hasOwnProperty(typeof item+item) ? false : obj[typeof item+item] = true);


  ```    
  - <b>use Set : mostly recommended one</b>  
  ```javascript
    return Array.from(new Set(arr))
    return [...new Set(arr)]
  ```  
  - use Map  
  ```javascript
    //the main reason Map could be applied into use is becouse of its has method
    var buffer=new Map;
    return arr.filter(item=>!buffer.has(item)&&buffer.set(item))
  ```  
    
#### ES6 : spread operaotor、 Set and Map  
  
......to be continued
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
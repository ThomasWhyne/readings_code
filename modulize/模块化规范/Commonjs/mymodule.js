var count=3;

var counter={
    value:3
}

function increase(){
    count+=1;
}

function increment(){
    counter.value+=1;
}


module.exports={
    count:count,
    increase:increase,
    counter:counter,
    increment
}

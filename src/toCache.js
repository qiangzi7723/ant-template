const isKeyWord=require('./adapter/is-keyword');

const toCache=(string,{cache})=>{
    const strArr=string.split(/[^\w]+/);
    strArr.forEach((str)=>{
        if(str&&!isKeyWord(str)&&isNaN(str)){
            // 说明是可能的变量
            if(!cache[str]){
                cache[str]=true;
            }
        }
    })
}


module.exports = toCache;

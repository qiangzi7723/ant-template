const getSource=(str)=>{
    const source=str.source;
    if(typeof source!=='undefined'){
        return source;
    }else{
        const dom=document.getElementById(str);
        return dom.innerHTML;
    }
}

module.exports=getSource;

const getSource=(id)=>{
    const dom=document.getElementById(id);
    return dom.innerHTML;
}

module.exports=getSource;

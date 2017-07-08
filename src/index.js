const compile=require('./compile');

const template=(id,data,options)=>{
    return compile(id,data,options);
};

module.exports=template;

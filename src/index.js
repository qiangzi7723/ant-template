const compile=require('./compile');
const config=require('./config');

const template=(source,data,options)=>{
    return compile(source,data,options);
};

module.exports=template;


const config=require('./config');
const getSource=require('./adapter/getSource');
const Compiler=require('./compiler');

const compile =(source,data,options)=>{
    const str=getSource(source);
    config.source=str;
    Object.assign(config,options);
    const compiler=new Compiler(config);
    const result=compiler.build(data);
    return result;
}

module.exports=compile;

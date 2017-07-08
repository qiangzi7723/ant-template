
const config=require('./config');
const getSource=require('./adapter/getSource');
const Compiler=require('./compiler');

const compile =(id,data,options)=>{
    const source=getSource(id);
    config.source=source;
    Object.assign(config,options);
    const compiler=new Compiler(config);
    const result=compiler.build(data);
    return result;
}

module.exports=compile;

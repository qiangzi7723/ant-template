const splitToken=require('./spiltToken');
const toCache=require('./toCache');
require('./escape');

class Compiler{
    constructor(config){
        this.signal=config.signal;
        this.config=config;
        // 源码切割为HTML和JS字符段
        const token=splitToken(config);
        this.tokenCompile=token.map((content)=>{
            if(content.type=='tpl'){
                return this.phaserTpl(content);
            }else{
                return this.phaserJs(content);
            }
        })
    }
    // 解析HTML语法
    phaserTpl(content){
        // 清除空白
        content.value=content.value.replace(/\n/g,'');
        return this.signal+'+="'+content.value+'";';
    }
    // 解析JS语法 同时把其中的变量名提取出来
    phaserJs(content){
        // 提取变量
        toCache(content.value,this.config);
        // 处理赋值语句
        content.value.trim();
        if(content.value.startsWith('=')){
            content.value=content.value.replace(/=/,'')
            if(this.config.escape){
                // 说明开启了转义
                return this.signal+'+='+'$_escape('+content.value+')'+';';
            }
            return this.signal+'+='+content.value+';';
        }
        return content.value;
    }
    build(data){
        // 添加变量声明
        this.variableDeclare();
        this.completeToken();
        // 编译
        const fn=new Function('data','payload',this.tokenCompile);
        const result=fn(data,this.config.payload);
        return result;
    }
    variableDeclare(){
        const cache=this.config.cache;
        const sum=Object.keys(cache).map((key)=>{
            return 'var '+key+' = '+'data.'+key+';';
        })
        this.tokenCompile.unshift(...sum);
    }
    completeToken(){
        this.tokenCompile.unshift('var $_escape=payload["escape"];');
        this.tokenCompile.unshift('var '+this.config.signal+' = "";');
        // this.tokenCompile.push('debugger;');
        this.tokenCompile.push('return '+this.config.signal+';');
        this.tokenCompile=this.tokenCompile.join('\n');
        console.log(this.tokenCompile);
    }
}

module.exports = Compiler;

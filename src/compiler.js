const splitToken=require('./spiltToken');
const toCache=require('./toCache');

class Compiler{
    constructor(config){
        this.signal=config.signal;
        this.config=config;
        const token=splitToken(config);
        // console.log(token);
        this.tokenCompile=token.map((content)=>{
            if(content.type=='tpl'){
                return this.phaserTpl(content);
            }else{
                return this.phaserJs(content);
            }
        })
        console.log(this.tokenCompile);
    }
    // 解析HTML语法
    phaserTpl(content){
        // 清楚空白
        content.value=content.value.replace(/\n/g,'');
        return this.signal+'+="'+content.value+'";';
    }
    // 解析JS语法 同时把其中的变量名提取出来
    phaserJs(content){
        toCache(content.value,this.config);
        content.value.trim();
        if(content.value.indexOf('=')==0){
            // 赋值语句
            content.value=content.value.replace(/=/,'')
            return this.signal+'+='+content.value;
        }
        return content.value;
    }
    build(data){
        // 添加变量声明
        this.variableDeclare()

        // 编译
        const fn=new Function("data",this.tokenCompile);
        const result=fn(data)
        return result;
    }
    variableDeclare(){
        const cache=this.config.cache;
        console.log(Object.keys(cache));
        const sum=Object.keys(cache).map((key)=>{
            return 'var '+key+' = '+'data.'+key+';';
        })
        sum.unshift('var $_tpl="";');
        const dec=sum.join('\n');
        this.tokenCompile.unshift(dec);
        this.tokenCompile.push('return $_tpl;')
        console.log(this.tokenCompile);
        this.tokenCompile=this.tokenCompile.join('\n');
        console.log(this.tokenCompile);
    }
}

module.exports = Compiler;

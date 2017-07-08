const splitToken = (config) => {
    const token = [];
    const {
        openTag,
        closeTag,
        source
    } = config;
    // 把模板切割为JS字符串以及HTML字符串
    source.split(openTag).forEach((content) => {
        const temp = content.split(closeTag);
        if(temp.length==2){
            token.push({
                value:temp[0],
                type:'js'
            },{
                value:temp[1],
                type:'tpl'
            })
        }else{
            token.push({
                value:temp[0],
                type:'tpl'
            })
        }
    })
    return token;
}

module.exports = splitToken;

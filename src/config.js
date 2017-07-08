const config={
    openTag:'<%', // 开标签
    closeTag:'%>', // 闭标签
    signal:'$_tpl',
    cache:{},
    escape:true, // 是否转义，防止xss注入
    payload:{} // 可以往payload中注入内容
}
module.exports = config;

const config = require('./config');
config.payload.escape = function(str) {
    // 简单转义
    // "	&#34;	&quot;
    // &	&#38;	&amp;
    // <	&#60;	&lt;
    // >	&#62;	&gt;
    if(typeof str!=='string') return str;
    const arr = str.split('');
    arr.forEach((key, index) => {
        switch (String.prototype.charCodeAt.call(key,0)) {
            case 34:
                arr[index] = '&#34';
                break;
            case 38:
                arr[index] = '&#38';
                break;
            case 60:
                arr[index] = '&#60';
                break;
            case 62:
                arr[index] = '&#62';
                break;
        }
    })
    return arr.join('');
}

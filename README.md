#### 打造轻量级模板引擎

- 支持编译HTML模板
- 支持编译JS模板
- 自定义开闭标签
- 自定义是否转义标签
- 可通过data参数向模板注入函数
- 目前暂不考虑浏览器兼容

### `template(source,data,options)`

    <div id="content"></div>
    <script id="test" type="text/html">
        <% if (isAdmin) { %>

            <h1><%=title%></h1>
            <ul>
                <% for (var i = 0; i < list.length; i ++) { %>
                    <li>索引
                        <%= i + 1 %> ：
                            <%= list[i] %>
                    </li>
                    <% } %>
            </ul>

            <% } %>

    </script>

    <script>
        var data = {
            title: '基本例子',
            isAdmin: true,
            list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        };
        var html = template('test', data);
        document.getElementById('content').innerHTML = html;
    </script>

`template()`的第一个参数可以直接传入一个ID值，除此之外可以传入模板字符串，如下

    <script>
        var source = '<ul>' +
            '<% for (var i = 0; i < list.length; i ++) { %>' +
            '<li>索引 <%= i + 1 %> ：<%= list[i] %></li>' +
            '<% } %>' +
            '</ul>';

        var data = {
            title: '基本例子',
            isAdmin: true,
            list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        };

        var html = template({source}, data);
        document.getElementById('content').innerHTML = html;
    </script>

此时`template`的第一个参数强制是对象，并且键名必须为`source`

### `options`参数

    const config={
        openTag:'<%', // 开标签
        closeTag:'%>', // 闭标签
        signal:'$_tpl',
        cache:{},
        escape:true, // 是否转义，防止xss注入
        payload:{} // 可以往payload中注入内容
    }

#### 自定义开闭标签

    <h1>自定义界定符</h1>
    <script id="test" type="text/html">
        <!--[if (title) {]-->
        <h3><!--[= title]--></h3>
        <!--[} else {]-->
        <h3>无标题</h3>
        <!--[}]-->
        <ul>
            <!--[for (var i = 0; i < list.length; i ++) {]-->
            <li>索引
                <!--[= i + 1 ]-->：
                <!--[= list[i]]-->
            </li>
            <!--[}]-->
        </ul>

    </script>

    <script>
        template.openTag = '<!--[';
        template.closeTag = ']-->';


        var data = {
            title: '我的标签',
            list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        };
        var opt = {
            openTag: '<!--[',
            closeTag: ']-->'
        }
        var html = template('test', data, opt);
        document.getElementById('content').innerHTML = html;
    </script>

#### 开启不转义标签（默认转义）

    <h1>不转义HTML</h1>
    <div id="content"></div>
    <script id="test" type="text/html">
    <p>不转义： <%=value%></p>
    </script>

    <script>
    var data = {
        value: '<span style="color:#F00">hello world!</span>'
    };
    var html = template('test', data);
    document.getElementById('content').innerHTML = html;
    </script>

后期版本迭代

- 优化换行
- 增加智能报错

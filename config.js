module.exports = {
    cookieSecret: 'myapp',
    connectionstring: 'mongodb://localhost:27017/myapp',

    def: {
        0 : '操作成功',
        99999: "执行异常",
        10000 : '请登录，再操作',
        10001 : 'Token过期或不存在',
        10002 : '用户已存在',
        10003 : '用户或密码不正确',
        10004 : '请填写用户名',
        10005 : '请填写密码',
        10006 : '请填写Token',
        10007 : '登录异常',
        10008 : '当前在线',
        10009 : '当前离线',
    }
};
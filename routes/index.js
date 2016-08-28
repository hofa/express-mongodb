var usersModel = require('./../models').Users;
var mainController = require('./../controllers/main');
var usersController = require('./../controllers/users');
var urlParser = require('url');
var def = require('./../config').def;
var noLoginFilter = [
    '/users/checkLogin',
    '/users/Login',
    '/users/reg',
];

module.exports = function(app) {

    app.use(function (req, res, next) {
        var p = urlParser.parse(req.originalUrl);
        console.log('INDEX:', noLoginFilter.indexOf(p.pathname));
        if (noLoginFilter.indexOf(p.pathname) == 0) {            
            next();
        } else {
            var params = req.body;
            if (req.method == 'GET') {
                params = req.query;
            }
            usersModel.find({'username': params.username, 'token': params.token}, function(err, model) {
                if (err == null) {
                    if (model.length > 0) {
                        next();
                    } else {
                        res.json({err: 10001, msg: def[10001]});
                    }
                } else {
                    res.json({err: 99999, msg: def[99999]});
                }
            });
        }
        
    });

    app.get('/', mainController.index);
    app.get('/users', usersController.index);
    app.get('/users/checkLogin', usersController.checkLogin);
    app.post('/users/reg', usersController.reg);
    app.post('/users/loginIn', usersController.loginIn);
    app.post('/users/loginOut', usersController.loginOut);
}

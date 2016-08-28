var usersModel = require('./../models').Users;
var def = require('./../config').def;
var crypto = require('crypto');

function encryptPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}

exports.index = function (req, res) {

    // console.log(usersModel);
    // usersModel.count({}, function(err, model) {
    //     console.log(err, model)
    // });

    // usersModel.find({}, function(err, model) {
    //     console.log(err, model)
    // });

    // console.log(1);
    res.json({err: 1, msg: '', data: {token: '123455'}})
    // res.send('users');
}


exports.loginIn = function (req, res) {
    // req.sanitize();
    var schema = {
     'username': {
        notEmpty: true,
        errorMessage: 10004
      },
      'password': {
        notEmpty: true,
        errorMessage: 10005
      }
    };

    req.sanitize('username').trim();
    req.sanitize('password').trim();
    req.check(schema);
    // var mappedErrors = req.validationErrors(true); // Or req.asyncValidationErrors(true); 
    // res.json({err: err, msg: mappedErrors})
    req.asyncValidationErrors()
    .then(function() {
        usersModel.find({'username': req.body.username, 'password': encryptPassword(req.body.password)}, function(err, model) {
            if (err == null) {
                if (model.length > 0) {
                    var token = encryptPassword(req.body.username + Date.now());
                    usersModel.findOneAndUpdate({username: req.body.username}, {token: token}, function(errs) {
                        if (errs) return res.json({err: 10007, msg: def[10007]});
                        res.json({err: 0, msg: def[0], data: {token: token, username: req.body.username}});
                    });
                } else {
                    res.json({err: 10003, msg: def[10003]});
                }
            } else {
                res.json({err: 99999, msg: def[99999]});
            }
        });
    })
    .catch(function(errors) {
        res.json({err: errors[0].msg, msg: def[errors[0].msg]})
    });
}

exports.loginOut = function (req, res) {
    req.sanitize('username').trim();
    usersModel.findOneAndUpdate({username: req.body.username}, {token: ""}, function(errs) {
        if (errs) return res.json({err: 10007, msg: def[10007]});
        res.json({err: 0, msg: def[0]});
    });
}

exports.checkLogin = function (req, res) {
    // console.log(req.validate.extend);
    // req.sanitize();
    var schema = {
     'username': {
        notEmpty: true,
        errorMessage: 10004
      },
      'token': {
        notEmpty: true,
        errorMessage: 10006
      }
    };

    req.sanitize('username').trim();
    req.sanitize('token').trim();
    req.checkQuery(schema);
    // var mappedErrors = req.validationErrors(true); // Or req.asyncValidationErrors(true); 
    // res.json({err: err, msg: mappedErrors})
    req.asyncValidationErrors()
    .then(function() {
        usersModel.find({'username': req.query.username, 'token': req.query.token}, function(err, model) {
            if (err == null) {
                if (model.length > 0) {
                    res.json({err: 0, msg: def[10008]});
                } else {
                    res.json({err: 10001, msg: def[10001]});
                }
            } else {
                res.json({err: 99999, msg: def[99999]});
            }
        });
    })
    .catch(function(errors) {
        res.json({err: errors[0].msg, msg: def[errors[0].msg]})
    });
}

exports.reg = function (req, res) {
    // req.sanitize();
    var schema = {
     'username': {
        notEmpty: true,
        errorMessage: 10004
      },
      'password': {
        notEmpty: true,
        errorMessage: 10005
      }
    };

    req.sanitize('username').trim();
    req.sanitize('password').trim();
    req.checkBody(schema);
    // var mappedErrors = req.validationErrors(true); // Or req.asyncValidationErrors(true); 
    // res.json({err: err, msg: mappedErrors})
    req.asyncValidationErrors()
    .then(function() {
        usersModel.find({'username': req.body.username}, function(err, model) {
            if (err == null) {
                if (model.length > 0) {
                    res.json({err: 10002, msg: def[10002]});
                } else {
                    var u = new usersModel({'username': req.body.username, 'password': encryptPassword(req.body.password)});
                    u.save(function (errs) {
                        if (errs) return res.json({err: 99999, msg: def[99999]});
                        res.json({err: 0, msg: def[0]});
                    });
                }
            } else {
                res.json({err: 99999, msg: def[99999]});
            }
        });
    })
    .catch(function(errors) {
        res.json({err: errors[0].msg, msg: def[errors[0].msg]})
    });
}

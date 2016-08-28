/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/25/13
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = new Schema({
    username: String,
    password: String,
    token: {type: String, default: ''},
    created: {type: Number, default: Date.now()}
});

// schema.virtual("password").set(function (password) {
//     this.hash_password = encryptPassword(password);
// });

// schema.method("authenticate", function (plainText) {
//     return encryptPassword(plainText) === this.hash_password;
// });

// function encryptPassword(password) {
//     return crypto.createHash("md5").update(password).digest("base64");
// }

mongoose.model('Users', schema);
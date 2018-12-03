"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(username, password) {
        var _this = this;
        this.verifyPassword = function (password) {
            return _this.password === password;
        };
        this.username = username;
        this.password = password;
    }
    return User;
}());
exports.User = User;

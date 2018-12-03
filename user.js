"use strict";
exports.__esModule = true;
var operators_1 = require("rxjs/operators");
var from_1 = require("rxjs/internal/observable/from");
var User = /** @class */ (function () {
    function User(username, password) {
        var _this = this;
        this.verifyPassword = function (password) {
            return _this.password === password;
        };
        this.sayHello = function () { return console.log('Bienvenido:', _this.username); };
        this.username = username;
        this.password = password;
    }
    return User;
}());
exports.User = User;
exports.validateUser = function () {
    return operators_1.mergeMap(function (dbResponse) {
        return from_1.from(dbResponse.db.users).pipe(operators_1.find(function (user) {
            return user.username === dbResponse.activeUser.username;
        }), operators_1.map(function (value) {
            if (value === undefined) {
                dbResponse.userValidation = false;
            }
            else {
                var user = new User(value.username, value.password);
                dbResponse.activeUser = user;
                dbResponse.userValidation = true;
            }
            return dbResponse;
        }));
    });
};

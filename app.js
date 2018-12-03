"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var from_1 = require("rxjs/internal/observable/from");
var operators_1 = require("rxjs/operators");
var questions_1 = require("./questions");
var inquirer_1 = require("inquirer");
var user_1 = require("./user");
var Observable_1 = require("rxjs/internal/Observable");
var start = function () {
    return operators_1.mergeMap(function (dbResponse) {
        return from_1.from(inquirer_1.prompt(questions_1.startPrompt)).pipe(operators_1.map(function (answer) {
            dbResponse.startSelection = answer;
            return dbResponse;
        }));
    });
};
var startResponse = function () {
    return operators_1.mergeMap(function (dbResponse) {
        switch (dbResponse.startSelection.start) {
            case 'Ingresar':
                return login(dbResponse);
            case 'Registrarse':
                return registerUser(dbResponse);
            default:
                throw Observable_1.Observable["throw"]('Adios');
        }
    });
};
var login = function (dbResponse) {
    return from_1.from(inquirer_1.prompt(questions_1.usernamePrompt)).pipe(operators_1.map(function (answer) {
        dbResponse.userRegistration = false;
        dbResponse.activeUser = new user_1.User(answer.username, '');
        return dbResponse;
    }));
};
var registerUser = function (dbResponse) {
    return from_1.from(inquirer_1.prompt(questions_1.newUserPrompt)).pipe(operators_1.mergeMap(function (answer) {
        dbResponse.db.users.push(answer);
        var content = JSON.stringify(dbResponse.db, null, '  ');
        dbResponse.userRegistration = true;
        return from_1.from(utils_1.writeFile('db.json', content, dbResponse));
    }));
};
var main = function () {
    var dbResponse$ = from_1.from(utils_1.initDB());
    dbResponse$
        .pipe(start(), startResponse())
        .subscribe(function (data) {
    });
};
main();

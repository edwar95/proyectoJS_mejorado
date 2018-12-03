"use strict";
exports.__esModule = true;
var inquirer_1 = require("inquirer");
exports.startPrompt = {
    type: 'list',
    name: 'start',
    message: 'Seleccione: ',
    choices: ['Ingresar', 'Registrarse', new inquirer_1.Separator(), 'Salir']
};
exports.usernamePrompt = {
    type: 'input',
    name: 'username',
    message: 'Ingrese su nombre de usuario:'
};
exports.newUserPrompt = [
    {
        type: 'input',
        name: 'username',
        message: 'Ingrese su usuario:'
    },
    {
        type: 'password',
        message: 'Ingrese su contraseña:',
        name: 'password',
        mask: '*'
    }
];
exports.passwordPrompt = {
    type: 'password',
    message: 'Ingrese su contraseña:',
    name: 'password',
    mask: '*'
};
exports.teamPrompt = {
    type: 'list',
    name: 'teams',
    message: 'Escoja una opcion:',
    choices: ['Ingresar Nuevo Equipo', 'Ver Todos', new inquirer_1.Separator(), 'Salir']
};

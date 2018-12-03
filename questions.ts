import {Answers, Separator, Question} from 'inquirer';
export const startPrompt: Question<Answers>={
    type: 'list',
    name: 'start',
    message: 'Seleccione: ',
    choices: ['Ingresar', 'Registrarse', new Separator(), 'Salir']
};

export const usernamePrompt: Question<Answers> = {
    type: 'input',
    name: 'username',
    message: 'Ingrese su nombre de usuario:'
};

export const newUserPrompt: Question<Answers>[] = [
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

export const passwordPrompt: Question<Answers> = {
    type: 'password',
    message: 'Ingrese su contraseña:',
    name: 'password',
    mask: '*'
};
import {DBResponse, initDB, writeFile} from "./utils";
import {from} from "rxjs/internal/observable/from";
import {filter, map, mergeMap} from "rxjs/operators";
import {newUserPrompt, passwordPrompt, startPrompt, usernamePrompt, teamPrompt} from "./questions";
import {prompt,Answers, Separator} from 'inquirer';
import {User, UserInterface, validateUser} from "./user";
import {Observable} from "rxjs/internal/Observable";

const start = () => {
    return mergeMap((dbResponse: DBResponse) => {
        return from(prompt(startPrompt)).pipe(
            map((answer: Answers) => {
                dbResponse.startSelection = answer;
                return dbResponse;
            })
        );
    });
};

const startResponse = () => {
    return mergeMap((dbResponse: DBResponse) => {
        switch (dbResponse.startSelection!.start) {
            case 'Ingresar':
                return login(dbResponse);
            case 'Registrarse':
                return registerUser(dbResponse);
            default:
                throw Observable.throw('Adios');
        }
    });
};

const login = (dbResponse: DBResponse) => {
    return from(prompt(usernamePrompt)).pipe(
        map((answer: Answers) => {
            dbResponse.userRegistration = false;
            dbResponse.activeUser = new User (answer.username, '');
            return dbResponse;
        })
    );
};

const registerUser = (dbResponse: DBResponse) => {
    return from(prompt(newUserPrompt)).pipe(
        mergeMap((answer: Answers) => {
            dbResponse.db.users.push(<UserInterface>answer);
            const content: string = JSON.stringify(dbResponse.db, null, '  ');

            dbResponse.userRegistration = true;
            return from(writeFile('db.json', content, dbResponse));
        })
    );
};

const enterPassword = () => {
    return mergeMap((dbResponse: DBResponse) => {
        return from(prompt(passwordPrompt)).pipe(
            map((answer: Answers) => {
                if (dbResponse.activeUser!.verifyPassword(answer.password)) {
                    dbResponse.activeUser!.sayHello();
                } else {
                    dbResponse.userValidation = false;
                }
                return dbResponse;
            })
        );
    });
};

const teamMenu = () => {
    return mergeMap((dbResponse: DBResponse) => {
        return from(prompt(teamPrompt)).pipe(
            map((answer: Answers) => {
                dbResponse.TeamSelection= answer;
                return dbResponse;
            })
        );
    });
};

const teamResponse = () => {
    return mergeMap((dbResponse: DBResponse) => {
        switch (dbResponse.TeamSelection!.team) {
            case 'Ingresar Nueva':
                //return insertMovie(dbResponse);
            case 'Ver Todas':
                //return seeMovies(dbResponse);
            default:
                throw Observable.throw('Adios');
        }
    });
};


const main =()=>{
    const dbResponse$= from(initDB());
    dbResponse$
        .pipe(
            start(),
            startResponse(),
            filter((dbResponse: DBResponse) => {
                return dbResponse.userRegistration !== true;
            }),
            validateUser(),
            enterPassword(),
            filter((dbResponse: DBResponse) => {
                return dbResponse.userValidation !== false;
            }),
            teamMenu(),
            teamResponse(),

        )
        .subscribe(
            (data)=> {
            }
        )
};

main();
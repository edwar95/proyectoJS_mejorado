import {find, map, mergeMap} from "rxjs/operators";
import {DBResponse} from "./utils";
import {from} from "rxjs/internal/observable/from";

export class User {
    username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }


    public verifyPassword = (password: string): boolean =>
        this.password === password;

    public sayHello = (): void => console.log('Bienvenido:', this.username);
}

export interface UserInterface {
    username: string;
    password: string;
}

export const validateUser = () => {
    return mergeMap((dbResponse: DBResponse) => {
        return from(dbResponse.db.users).pipe(
            find(
                (user: UserInterface) =>
                    user.username === dbResponse.activeUser!.username
            ),
            map((value: UserInterface | undefined) => {
                if (value === undefined) {
                    dbResponse.userValidation = false;
                } else {
                    const user = new User(
                        value.username,
                        value.password
                    );
                    dbResponse.activeUser = user;
                    dbResponse.userValidation = true;
                }
                return dbResponse;
            })
        );
    });
};
import {Answers} from 'inquirer'
import {User, UserInterface} from "./user";
import {Team} from "./Team";
import * as fs from 'fs';

export interface DBResponse {
    message: string;
    db: DB;
    startSelection?: Answers;
    activeUser?: User;
    userValidation?: boolean;
    userRegistration?: boolean;
    activeTeam?: Team;
    TeamSelection?: Answers;
    TeamInsert?: boolean;
    TeamDetailSelection?: Answers;
}

interface DB {
    users: UserInterface[];
    movies: Team[];
}

export const initDB = async () => {
    const fileName: string = 'db.json';
    const newContent: string = '{"users":[],"teams":[]}';
    try {
        const readResponse = await readFile(fileName);

        return {
            message: 'DB read successfully',
            db: JSON.parse(readResponse)
        };
    } catch (error) {
        const writeResponse = await writeFile(fileName, newContent);

        return {
            message: 'DB read successfully',
            db: JSON.parse(newContent)
        };
    }
};

export const readFile = (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            fileName,
            'utf-8',
            (error: NodeJS.ErrnoException, data: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            }
        );
    });
};

export const writeFile = (
    fileName: string,
    content: string,
    dbResponse?: DBResponse
): Promise<DBResponse> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, (error: NodeJS.ErrnoException) => {
            if (!error) {
                resolve(dbResponse);
            }
        });
    });
};
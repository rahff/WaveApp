import * as fs from "fs";
import { resolve } from 'path';
import { IContactItem } from "../../interfaces/IContactItem";


export const fakeContact: IContactItem = {"photo":"123654789963258741.png","email":"testertest@gamil.com","username":"tester", "id": "123654789963258741"}
export const getDataImg = (filename: string, encoding: string, baseUserDirectory: string): string => {
    const file = fs.readFileSync(resolve(baseUserDirectory, filename));
    return file.toString(encoding);
}

export const isFileExist = (filename: string, baseDirectory: string) => fs.existsSync(resolve(baseDirectory,filename));
export const isPublicKey = (stringData: string) => !!stringData.split("PUBLIC KEY\n")[1];
export const removeFile = (baseDirectory: string, filename: string) => fs.unlinkSync(resolve(baseDirectory, filename));
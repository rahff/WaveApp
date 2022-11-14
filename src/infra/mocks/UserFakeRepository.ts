

import { UserRepository } from "../../core/ports/driven/UserRepository";
import { Command } from "../../shared/actions/Action";
import { IUser } from "../models/IUser";
import { user1 } from "./fake-data";



export class UserFakeRepository implements UserRepository {

    async saveUserPhoto(command: Command): Promise<boolean> {
        if(command.getPayload().filename !== "user.png") return false;
        return true;
    }

    getDefaultUser(): Promise<IUser | null> {
        return new Promise((resolve)=> resolve(user1.asDto()));
    }

    saveUser(user: IUser): Promise<IUser> {
        return new Promise((resolve)=> {
            resolve(user);
        })
    }

}
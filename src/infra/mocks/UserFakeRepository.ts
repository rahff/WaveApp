import { User } from "src/core/entities/User";
import { UserRepository } from "src/core/ports/driven/UserRepository";
import { userMapper } from "../../core/mappers/entities/UserMapper";
import { IUser } from "../models/IUser";
import { user1 } from "./fake-data";



export class UserFakeRepository implements UserRepository {

    getDefaultUser(): Promise<IUser | null> {
        return new Promise((resolve)=> resolve(user1.asDto()));
    }

    getUser(id: string): Promise<IUser> {
        return new Promise((resolve)=> resolve(user1.asDto()));
    }

    saveUser(user: IUser): Promise<IUser> {
        return new Promise((resolve)=> {
            resolve(user);
        })
    }

}
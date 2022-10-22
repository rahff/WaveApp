import { User } from "src/core/entities/User";
import { UserRepository } from "src/core/ports/driven/UserRepository";
import { userMapper } from "../../core/mappers/entities/UserMapper";
import { IUser } from "../models/IUser";
import { user1 } from "./fake-data";



export class UserFakeRepository implements UserRepository {

    getDefaultUser(): Promise<IUser | null> {
        return new Promise((resolve)=> resolve(user1.asDto()));
    }

    loginUser(email: string, password: string): Promise<IUser> {
        return new Promise((resolve, reject)=> {
            if(password === "Mot2$asse" && email === user1.asDto().email){
                resolve(user1.asDto())
            }else{
                reject(new Error('invalid credentials'))
            }
        });
    }

    saveUser(user: IUser): Promise<IUser> {
        return new Promise((resolve)=> {
            resolve(user);
        })
    }

}
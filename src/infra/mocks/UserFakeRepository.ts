import { User } from "src/core/entities/User";
import { UserRepository } from "src/core/ports/driven/UserRepository";
import { user1 } from "./fake-data";



export class UserFakeRepository implements UserRepository {

    getUser(): Promise<User> {
        return new Promise((resolve)=> resolve(user1));
    }

    saveUser(user: User): Promise<User> {
        return new Promise((resolve)=> {
            resolve(user);
        })
    }

}
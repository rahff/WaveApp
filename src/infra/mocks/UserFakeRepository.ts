import { User } from "src/core/entities/User";
import { UserRepository } from "src/core/ports/driven/UserRepository";

export class UserFakeRepository implements UserRepository {
    verifyPassword(password: string): Promise<boolean> {
        return new Promise((resolve)=>{
            if(password === "Mot2$asse")
                resolve(true);
            else
                resolve(false);
        })
    }

    saveUser(user: User): Promise<User> {
        return new Promise((resolve)=> {
            const savedUser = new User(user.getName(), user.getFirstname(), user.getEmail());
            resolve(savedUser);
        })
    }

}
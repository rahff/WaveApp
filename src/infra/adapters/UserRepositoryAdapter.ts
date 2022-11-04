
import { Injectable } from "@angular/core";
import { DatabaseModule } from "../modules/database.module";
import { IUser } from "../models/IUser";
import { UserRepository } from "../../core/ports/driven/UserRepository";





@Injectable({
    providedIn: DatabaseModule
})
export class UserRepositoryAdapter implements UserRepository {

    constructor(){}
    
    async getDefaultUser(): Promise<IUser | null> {
        const defaultUser = localStorage.getItem('defaultUser');
        if(defaultUser) return JSON.parse(defaultUser);
        return null;
    }

    async saveUser(user: IUser): Promise<IUser> {
        this.setLocalUser(user);
        return user;
    }

    async loginUser(email: string, password: string): Promise<IUser> {
      throw new Error("method not implemented");
      
    }

    private setLocalUser(user: IUser): void {
        localStorage.setItem('defaultUser', JSON.stringify(user))
    }
}
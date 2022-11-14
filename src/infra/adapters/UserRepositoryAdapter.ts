import { Inject, Injectable } from "@angular/core";
import { DatabaseModule } from "../modules/database.module";
import { IUser } from "../models/IUser";
import { UserRepository } from "../../core/ports/driven/UserRepository";
import { FileSystemBridge } from "../../../shared/ElectronApi";
import { Command } from "../../shared/actions/Action";
import { generateId } from "../utils/generators";



@Injectable({
    providedIn: DatabaseModule
})
export class UserRepositoryAdapter implements UserRepository {

    constructor(@Inject("FileSystemBridge") private fileSystemBridge: FileSystemBridge){}

    async saveUserPhoto(command: Command): Promise<boolean> {
       const result = await this.fileSystemBridge.dispatch(command.getName(), command.getPayload());
       return result;
    }
    
    async getDefaultUser(): Promise<IUser | null> {
        const defaultUser = localStorage.getItem('defaultUser');
        if(defaultUser) return JSON.parse(defaultUser);
        return null;
    }

    async saveUser(user: IUser): Promise<IUser> {
        user.id = generateId()
        const result = await this.fileSystemBridge.dispatch("registerUserFile", user);
        if(result){
            this.setLocalUser(user);
            return user;
        }else{
            throw new Error("registration failed");
        }
    }

    private setLocalUser(user: IUser): void {
        localStorage.setItem('defaultUser', JSON.stringify(user))
    }
}
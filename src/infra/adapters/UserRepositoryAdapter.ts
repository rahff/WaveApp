import { UserRepository } from "src/core/ports/driven/UserRepository";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { catchError, firstValueFrom, lastValueFrom, map } from "rxjs";
import { Injectable } from "@angular/core";
import { generateId } from "../utils/generators";
import { DatabaseModule } from "../modules/database.module";
import { IUser } from "../models/IUser";



@Injectable({
    providedIn: DatabaseModule
})
export class UserRepositoryAdapter implements UserRepository {

    constructor(private service: NgxIndexedDBService){}
    
    async getDefaultUser(): Promise<IUser | null> {
        return firstValueFrom(this.service.getAll<IUser>("user")
        .pipe(map((list: IUser[])=> list[0]), 
        catchError(()=> {throw new Error("something goes wrong")})), 
        {defaultValue: null});
    }

    async saveUser(user: IUser): Promise<IUser> {
        user.id = generateId();
        return await firstValueFrom(this.service.add("user", user)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async getUser(id: string): Promise<IUser> {
       return await firstValueFrom(this.service.getByID<IUser>("user", id)
       .pipe(catchError(()=> {throw new Error("something goes wrong")})));
    }

   
}
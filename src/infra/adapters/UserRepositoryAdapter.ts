import { User } from "src/core/entities/User";
import { UserRepository } from "src/core/ports/driven/UserRepository";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { catchError, firstValueFrom, lastValueFrom, map } from "rxjs";
import { Injectable } from "@angular/core";
import { generateId } from "../utils/generateId";
import { DatabaseModule } from "../modules/database.module";


@Injectable({
    providedIn: DatabaseModule
})
export class UserRepositoryAdapter implements UserRepository {

    constructor(private service: NgxIndexedDBService){}
    
    async getDefaultUser(): Promise<User | null> {
        return firstValueFrom(this.service.getAll<User>("user")
        .pipe(map((list: User[])=> list[0]), 
        catchError(()=> {throw new Error("something goes wrong")})), 
        {defaultValue: null});
    }

    async saveUser(user: User): Promise<User> {
        user.id = generateId();
        return firstValueFrom(this.service.add("user", user)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async getUser(id: string): Promise<User> {
       return firstValueFrom<User>(this.service.getByID<User>("user", id)
       .pipe(catchError(()=> {throw new Error("something goes wrong")})));
    }

   
}
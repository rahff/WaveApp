import { UserRepository } from "src/core/ports/driven/UserRepository";
import { catchError, firstValueFrom, lastValueFrom, map, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { generateId } from "../utils/generators";
import { DatabaseModule } from "../modules/database.module";
import { IUser } from "../models/IUser";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { user1 } from "../mocks/fake-data";



@Injectable({
    providedIn: DatabaseModule
})
export class UserRepositoryAdapter implements UserRepository {

    private baseUrl = environment.baseApiUrl;
    constructor(private service: HttpClient){}
    
    async getDefaultUser(): Promise<IUser | null> {
        const defaultUser = localStorage.getItem('defaultUser');
        if(defaultUser) return JSON.parse(defaultUser);
        return null;
    }

    async saveUser(user: IUser): Promise<IUser> {
        return await firstValueFrom(this.service.post<IUser>(`${this.baseUrl}/signup`, user)
        .pipe(tap(this.setLocalUser),
         catchError((error: any)=> {throw new Error(error.message)})));
    }

    async loginUser(email: string, password: string): Promise<IUser> {
        return await firstValueFrom(this.service.post<IUser>(`${this.baseUrl}/login`, {email, password})
        .pipe(tap(this.setLocalUser),
         catchError((error: any)=>{throw new Error(error.message)})));
    }

    private setLocalUser(user: IUser): void {
        localStorage.setItem('defaultUser', JSON.stringify(user))
    }
}
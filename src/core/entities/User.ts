import { IUser } from "../../infra/models/IUser";


export class User {

    protected photo: string = "user.png";
    
    constructor(protected username: string, protected email: string, protected id: string){
        this.checkDatavalidity();
    }


    private checkDatavalidity(): void {
        this.checkEmailValidity(this.email);
        this.checkUsernameValidity(this.username);
    }

    private checkEmailValidity(email: string): void {
        const isValid = !!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if(!isValid) throw new Error("invalid email...");
    }

    private checkUsernameValidity(username: string): void {
        const isValid = !!username;
        if(!isValid) throw new Error("username must not be blank value");
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getId(): string {
        return this.id;
    }

    public asDto(): IUser {
        return {
            username: this.username,
            email: this.email,
            photo: this.photo,
            id: this.id
        }
    }
}
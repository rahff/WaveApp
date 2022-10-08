import { IUser } from "src/infra/models/IUser";

export class User {

    constructor(private username: string, private email: string, private password: string, private id: string){
        this.checkDatavalidity();
    }


    private checkDatavalidity(): void {
        this.checkPasswordValidity(this.password);
        this.checkEmailValidity(this.email);
        this.checkUsernameValidity(this.username);
    }

    private checkPasswordValidity(password: string): void {
        const isValid = !!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/);
        if(!isValid) throw new Error("password must include at least 8 character and 1 special character 1 number and one uppercase");
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

    public getPassword(): string {
        return this.password;
    }

    public asDto(): IUser {
        return {
            username: this.username,
            email: this.email, 
            password: this.password,
            id: this.id
        }
    }
}
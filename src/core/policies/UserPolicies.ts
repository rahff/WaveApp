import { Command } from "src/shared/command/Command";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { User } from "../entities/User";
import { InvalidFormEvent } from "../events/shared/InvalidFormEvent";
import { WrongPasswordEvent } from "../events/user/WrongPasswordEvent";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserPolicies {

    constructor(private repository: UserRepository) {}

    async verifyPassword(password: string): Promise<Command> {
        const user = await this.repository.getUser();
        const match = user.password === password;
        if(!match) return new WrongPasswordEvent();
        return new SetIsAuthCommand(true);
    }  
    async saveUser(user: User): Promise<Command> {
        if(!this.isStrongPassword(user.password)){
            return new InvalidFormEvent("password must include at least 8 character and 1 special character 1 number and one uppercase");
        }
        if(!user.name || !user.firstname) {
            return new InvalidFormEvent("name & firstname must not be blank value");
        }
        if(!this.isValidEmail(user.email)){
            return new InvalidFormEvent("invalid email...");
        }
        const savedUser = await this.repository.saveUser(user);
        return new SetUserCommand(savedUser);
    }

    private isStrongPassword(password: string): boolean {
        return !!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    }

    private isValidEmail(email: string): boolean {
        return !!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    }
}
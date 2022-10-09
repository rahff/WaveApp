import { userMapper } from "src/core/mappers/entities/UserMapper";
import { IUser } from "src/infra/models/IUser";
import { Action } from "src/shared/actions/Action";

import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { SignupEvent } from "../events/user/SignupEvent";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserPolicies {

    constructor(private repository: UserRepository) {}

    async applyVerifyPasswordPolicies(password: string, email: string): Promise<Action> {
        try {
            const user = await this.repository.getUser(email);
            const match = user.password === password;
            if(!match) return new ErrorEvent("invalid credentials");
            return new SetIsAuthCommand(true);
        } catch (error) {
            return new ErrorEvent("invalid credential");
        }
    }  
    async applySaveUserPolicies(user: IUser): Promise<Action> {
        try {
            const _user = userMapper(user);
            const savedUser = await this.repository.saveUser(_user.asDto());
            const userEntity = userMapper(savedUser)
            return new SetUserCommand(userEntity);
        } catch (error: any) {
            return new ErrorEvent(error.message)
        }
    }

    async getUser(): Promise<Action> {
        const defaultUser = await this.repository.getDefaultUser();
        if(defaultUser) {
            const userEntity = userMapper(defaultUser);
            return new SetUserCommand(userEntity);
        }
        return new SignupEvent(true);
    }
}
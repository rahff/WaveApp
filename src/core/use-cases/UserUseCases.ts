import { userMapper } from "src/core/mappers/entities/UserMapper";
import { IUser } from "src/infra/models/IUser";
import { Action } from "src/shared/actions/Action";

import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { SignupEvent } from "../events/user/SignupEvent";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserUseCases {

    constructor(private repository: UserRepository) {}

    async applyVerifyPassword(password: string, email: string): Promise<Action> {
        try {
            const user = await this.repository.getUser(email);
            const match = user.password === password;
            if(!match) return new ExceptionEvent("invalid credentials");
            return new SetIsAuthCommand(true);
        } catch (error) {
            return new ExceptionEvent("invalid credential");
        }
    }  
    async applySaveUser(user: IUser): Promise<Action> {
        try {
            const _user = userMapper(user);
            const savedUser = await this.repository.saveUser(_user.asDto());
            const userEntity = userMapper(savedUser);
            userEntity.setIsAuth(true);
            return new SetUserCommand(userEntity);
        } catch (error: any) {
            return new ExceptionEvent(error.message)
        }
    }

    async getUser(): Promise<Action> {
        const defaultUser = await this.repository.getDefaultUser();
        if(defaultUser) {
            const userEntity = userMapper(defaultUser);
            userEntity.setIsAuth(false);
            return new SetUserCommand(userEntity);
        }
        return new SignupEvent(true);
    }
}


import { IUser } from "../../infra/models/IUser";
import { Action } from "../../shared/actions/Action";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { SignupEvent } from "../events/user/SignupEvent";
import { userMapper } from "../mappers/entities/UserMapper";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserUseCases {

    constructor(private repository: UserRepository) {}

    async applyLogin(password: string, email: string): Promise<Action> {
        try {
            const user = await this.repository.loginUser(email, password);
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
            userEntity.setIsAuth(true, savedUser.token);
            return new SetUserCommand(userEntity);
        } catch (error: any) {
            return new ExceptionEvent(error.message)
        }
    }

    async getUser(): Promise<Action> {
        const defaultUser = await this.repository.getDefaultUser();
        if(defaultUser) {
            const userEntity = userMapper(defaultUser);
            userEntity.setIsAuth(false, defaultUser.token);
            return new SetUserCommand(userEntity);
        }
        return new SignupEvent(true);
    }
}
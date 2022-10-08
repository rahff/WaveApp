import { userMapper } from "src/core/mappers/entities/UserMapper";
import { IUser } from "src/infra/models/IUser";
import { Command } from "src/shared/command/Command";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { IsNewUserEvent } from "../events/user/IsNewUserEvent";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserPolicies {

    constructor(private repository: UserRepository) {}

    async applyVerifyPasswordPolicies(password: string, id: string): Promise<Command> {
        const user = await this.repository.getUser(id);
        const match = user.password === password;
        if(!match) return new ErrorEvent("invalid credentials");
        return new SetIsAuthCommand(true);
    }  
    async applySaveUserPolicies(user: IUser): Promise<Command> {
        try {
            const _user = userMapper(user);
            const savedUser = await this.repository.saveUser(_user.asDto());
            const userEntity = userMapper(savedUser)
            return new SetUserCommand(userEntity);
        } catch (error: any) {
            return new ErrorEvent(error.message)
        }
    }

    async getUser(): Promise<Command> {
        const defaultUser = await this.repository.getDefaultUser();
        if(defaultUser) {
            const userEntity = userMapper(defaultUser);
            return new SetUserCommand(userEntity);
        }
        return new IsNewUserEvent(true);
    }
}
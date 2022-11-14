

import { IUser } from "../../infra/models/IUser";
import { Action, Command } from "../../shared/actions/Action";
import { SetUserCommand } from "../commands/user/UserCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { SignupEvent } from "../events/user/SignupEvent";
import { Base64File } from "../../../shared/Base64File";
import { userMapper } from "../mappers/entities/UserMapper";
import { UserRepository } from "../ports/driven/UserRepository";
import { SetPhotoSavedEvent } from "../events/user/SetPhotoSavedEvent";



export class UserUseCases {

    constructor(private repository: UserRepository) {}


    async applySaveUser(user: IUser): Promise<Action> {
        try {
            const _user = userMapper(user);
            await this.repository.saveUser(_user.asDto());
            return new SetUserCommand(_user);
        } catch (error: any) {
            return new ExceptionEvent(error.message)
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

    async saveUserPhoto(command: Command): Promise<Action> {
        const result = await this.repository.saveUserPhoto(command);
        if(result) return new SetPhotoSavedEvent(true);
        else return new ExceptionEvent("Save photo failed !");
    }
}
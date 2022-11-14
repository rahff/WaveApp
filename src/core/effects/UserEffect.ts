
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { UserUseCases } from "../use-cases/UserUseCases";
import { UserRepository } from "../ports/driven/UserRepository";
import { Action } from "../../shared/actions/Action";
import { SetPhotoSavedEvent } from "../events/user/SetPhotoSavedEvent";




export class UserEffect implements EffectCreator {

    private useCase: UserUseCases;

    constructor(private repository: UserRepository){
        this.useCase = new UserUseCases(this.repository);
    }

    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()){
            case "saveUser":
                try {
                    return await this.useCase.applySaveUser(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
    
            case "getUser":
                try {
                    return await this.useCase.getUser();  
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }

            case "saveUserPhoto":
                return await this.useCase.saveUserPhoto(command);
                
            default: throw new CommandNotFoundException();
        }
    }

}
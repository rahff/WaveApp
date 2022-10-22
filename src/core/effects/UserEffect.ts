
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { UserUseCases } from "../use-cases/UserUseCases";
import { UserRepository } from "../ports/driven/UserRepository";
import { Action } from "src/shared/actions/Action";



export class UserEffect implements EffectCreator {

    private validationPolicies: UserUseCases;

    constructor(private repository: UserRepository){
        this.validationPolicies = new UserUseCases(this.repository);
    }

    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()){
            case "saveUser":
                try {
                    return await this.validationPolicies.applySaveUser(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "login":
                try {
                    const { email, password } = command.getPayload();
                    return await this.validationPolicies.applyLogin(password, email);
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "getUser":
                try {
                    return await this.validationPolicies.getUser();  
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            default: throw new CommandNotFoundException();
        }
    }

}
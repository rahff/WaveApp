
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { UserPolicies } from "../policies/UserPolicies";
import { UserRepository } from "../ports/driven/UserRepository";
import { Action } from "src/shared/actions/Action";



export class UserEffect implements EffectCreator {

    private validationPolicies: UserPolicies;

    constructor(private repository: UserRepository){
        this.validationPolicies = new UserPolicies(this.repository);
    }

    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()){
            case "saveUser":
                try {
                    return await this.validationPolicies.applySaveUserPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "verifyPassword":
                try {
                    const { email, password } = command.getPayload();
                    return await this.validationPolicies.applyVerifyPasswordPolicies(password, email);
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "getUser":
                try {
                    return await this.validationPolicies.getUser();  
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            default: throw new CommandNotFoundException();
        }
    }

}
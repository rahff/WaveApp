import { Command } from "src/shared/command/Command";
import { UnknownErrorEvent } from "../events/shared/UnknownErrorEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { UserPolicies } from "../policies/UserPolicies";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserEffect implements EffectCreator {

    private validationPolicies: UserPolicies;

    constructor(private repository: UserRepository){
        this.validationPolicies = new UserPolicies(this.repository);
    }

    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()){
            case "saveUser":
                try {
                    return await this.validationPolicies.applySaveUserPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "verifyPassword":
                try {
                    const { id, password } = command.getPayload();
                    return await this.validationPolicies.applyVerifyPasswordPolicies(password, id);
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "getUser":
                try {
                    return await this.validationPolicies.getUser();  
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            default: throw new CommandNotFoundException();
        }
    }

}
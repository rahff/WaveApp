import { Command } from "src/shared/command/Command";
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
                return await this.validationPolicies.applySaveUserPolicies(command.getPayload());
            case "verifyPassword":
                const { id, password } = command.getPayload();
                return await this.validationPolicies.applyVerifyPasswordPolicies(password, id);
            case "getUser":
                return await this.validationPolicies.getUser();
            default: throw new CommandNotFoundException();
        }
    }

}
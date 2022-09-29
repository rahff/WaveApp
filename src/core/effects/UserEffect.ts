import { Command } from "src/shared/command/Command";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { SetUserCommand } from "../commands/user/UserCommand";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { UserRepository } from "../ports/driven/UserRepository";



export class UserEffect implements EffectCreator {

    constructor(private repository: UserRepository){}
    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "saveUser":
                const savedUser = await this.repository.saveUser(command.getPayload());
                return new SetUserCommand(savedUser);
            case "verifyPassword":
                const isAuth = await this.repository.verifyPassword(command.getPayload());
                return new SetIsAuthCommand(isAuth);
                
            default: throw new CommandNotFoundException()
        }
    }

}
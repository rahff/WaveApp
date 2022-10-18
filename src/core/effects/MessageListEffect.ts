
import { Action, Command } from "src/shared/actions/Action";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { MessageListUseCases } from "../use-cases/MessageListUseCases";
import { MessageListRepository } from "../ports/driven/MessageListRepository";
import { EffectCreator } from "../ports/driver/EffectCreator";



export class MessageListEffect implements EffectCreator {

    private messageListUseCases: MessageListUseCases;

    constructor(private repository: MessageListRepository) {
        this.messageListUseCases = new MessageListUseCases(repository);
    }

    async createEffect(command: Command): Promise<Action> {
        switch (command.getName()) {
            case "getNewMessages":
                return this.messageListUseCases.applyGetNewMessage();
        
            default: throw new CommandNotFoundException();
        }
    }

}

import { Action, Command } from "src/shared/actions/Action";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { MessageListUseCases } from "../use-cases/MessageListUseCases";
import { MessageListRepository } from "../ports/driven/MessageListRepository";
import { EffectCreator } from "../ports/driver/EffectCreator";



export class MessageListEffect implements EffectCreator {

    private messageListUseCases: MessageListUseCases;

    constructor(private repository: MessageListRepository) {
        this.messageListUseCases = new MessageListUseCases(this.repository);
    }

    async createEffect(command: Command): Promise<Action> {
        
        switch (command.getName()) {
            case "getNewMessages":
                return await this.messageListUseCases.applyGetNewMessage(command.getPayload());

            case "getMessageList":
                return await this.messageListUseCases.applyGetMessageList();

            default: throw new CommandNotFoundException();

        }
    }

}
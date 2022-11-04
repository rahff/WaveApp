
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { MessageListUseCases } from "../use-cases/MessageListUseCases";
import { MessageListRepository } from "../ports/driven/MessageListRepository";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { Action } from "../../shared/actions/Action";



export class MessageListEffect implements EffectCreator {

    private messageListUseCases: MessageListUseCases;

    constructor(private repository: MessageListRepository) {
        this.messageListUseCases = new MessageListUseCases(this.repository);
    }

    async createEffect(command: Action): Promise<Action> {
        
        switch (command.getName()) {
            case "getNewMessages":
                return await this.messageListUseCases.applyGetNewMessage(command.getPayload());

            case "getMessageList":
                return await this.messageListUseCases.applyGetMessageList();

            case "saveOutboxMessage":
                return await this.messageListUseCases.applySaveOutboxMessage(command.getPayload());

            default: throw new CommandNotFoundException();

        }
    }

}
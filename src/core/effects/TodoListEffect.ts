import { Command } from "src/shared/command/Command";
import { UnknownErrorEvent } from "../events/shared/UnknownErrorEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { TodoListPolicies } from "../policies/TodoListPolicies";
import { TodoListRepository } from "../ports/driven/TodoListRepository";



export class TodoListEffect implements EffectCreator {

    private validationPolicies: TodoListPolicies;

    constructor(private repository: TodoListRepository){
        this.validationPolicies = new TodoListPolicies(this.repository)
    }

    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "saveItem":
                try {
                    return await this.validationPolicies.applySaveItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "deleteItem":
                try {
                    return await this.validationPolicies.applyDeleteItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "modifyItem":
                try {
                    return await this.validationPolicies.applyModifyTodoItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "getItems":
                try {
                    return await this.validationPolicies.applyGetTodoListPolicies();
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }

            default: throw new CommandNotFoundException();
        }
    }
}
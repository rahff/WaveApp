import { Command } from "src/shared/command/Command";
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
                return await this.validationPolicies.applySaveItemPolicies(command.getPayload());
            case "deleteItem":
                return await this.validationPolicies.applyDeleteItemPolicies(command.getPayload());
            case "modifyItem":
                return await this.validationPolicies.applyModifyTodoItemPolicies(command.getPayload());
            case "getItems":
                return await this.validationPolicies.applyGetTodoListPolicies();

            default: throw new CommandNotFoundException();
        }
    }
}
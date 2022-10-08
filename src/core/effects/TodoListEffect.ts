
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { TodoListPolicies } from "../policies/TodoListPolicies";
import { TodoListRepository } from "../ports/driven/TodoListRepository";
import { Action } from "src/shared/actions/Action";



export class TodoListEffect implements EffectCreator {

    private validationPolicies: TodoListPolicies;

    constructor(private repository: TodoListRepository){
        this.validationPolicies = new TodoListPolicies(this.repository)
    }

    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "saveItem":
                try {
                    return await this.validationPolicies.applySaveItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "deleteItem":
                try {
                    return await this.validationPolicies.applyDeleteItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "modifyItem":
                try {
                    return await this.validationPolicies.applyModifyTodoItemPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "getItems":
                try {
                    return await this.validationPolicies.applyGetTodoListPolicies();
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }

            default: throw new CommandNotFoundException();
        }
    }
}
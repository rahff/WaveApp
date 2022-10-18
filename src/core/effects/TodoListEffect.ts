
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { TodoListUseCases } from "../use-cases/TodoListUseCases";
import { TodoListRepository } from "../ports/driven/TodoListRepository";
import { Action } from "src/shared/actions/Action";



export class TodoListEffect implements EffectCreator {

    private useCases: TodoListUseCases;

    constructor(private repository: TodoListRepository){
        this.useCases = new TodoListUseCases(this.repository)
    }

    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "saveItem":
                try {
                    return await this.useCases.applySaveItem(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "deleteItem":
                try {
                    return await this.useCases.applyDeleteItem(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "modifyItem":
                try {
                    return await this.useCases.applyModifyTodoItem(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "getItems":
                try {
                    return await this.useCases.applyGetTodoList();
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }

            default: throw new CommandNotFoundException();
        }
    }
}
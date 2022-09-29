import { ITodoItem } from "src/infra/interfaces/ITodoItem";
import { Command } from "src/shared/command/Command";
import { AddTodoListItemCommand } from "../commands/todoList/AddTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../commands/todoList/UpdateTodoItemCommand";
import { TodoItem } from "../entities/TodoItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { TodoListRepository } from "../ports/driven/TodoListRepository";


export class TodoListEffect implements EffectCreator {

    constructor(private repository: TodoListRepository){}

    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "saveItem":
                const savedItem = await this.repository.saveItem(command.getPayload() as ITodoItem);
                return new AddTodoListItemCommand(savedItem);
            case "deleteItem":
                const removedItemId = await this.repository.deleteItem(command.getPayload() as string);
                return new RemoveTodoListItemCommand(removedItemId);
            case "modifyItem":
                const modifiedItem = await this.repository.modifyTodoItem(command.getPayload());
                return new UpdateTodoItemCommand(modifiedItem);
            case "getItems":
                const todoList = await this.repository.getTodoList();
                return new SetTodoListItemsCommand(todoList);
            default: throw new CommandNotFoundException();
        }
    }
}
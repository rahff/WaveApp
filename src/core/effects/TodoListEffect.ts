import { ITodoItem } from "src/infra/interfaces/ITodoItem";
import { Command } from "src/shared/command/Command";
import { AddTodoListItemCommand } from "../commands/AddTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/SetTodoListItemsCommand";
import { UpdateDescriptionItemCommand } from "../commands/UpdateDescriptionItemCommand";
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
                const { id, update } = command.getPayload() as {id: string, update: string}
                const modifiedItem = await this.repository.modifyDescriptionItem(id, update);
                const { description } = modifiedItem;
                const _id = modifiedItem.getId();
                return new UpdateDescriptionItemCommand({id: _id, update: description});
            case "getItems":
                const todoList = await this.repository.getTodoList();
                return new SetTodoListItemsCommand(todoList);
            default: throw new CommandNotFoundException();
        }
    }
}
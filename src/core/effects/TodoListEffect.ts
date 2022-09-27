import { ITodoItem } from "src/infra/interfaces/ITodoItem";
import { Command } from "src/shared/command/Command";
import { AddTodoListItemCommand } from "../commands/TodoListCommand";
import { TodoItem } from "../entities/TodoItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { TodoListCommandPayload } from "../interfaces/command-payloads";
import { TodoListRepository } from "../ports/driven/TodoListRepository";


export class TodoListEffect {

    constructor(private repository: TodoListRepository){}

    async createEffect(command: Command<TodoListCommandPayload>): Promise<Command<TodoListCommandPayload>> {
        switch (command.getName()) {
            case "saveItem":
                const savedItem = await this.repository.saveItem(command.getPayload() as ITodoItem);
                return new AddTodoListItemCommand(savedItem);

            default: throw new CommandNotFoundException();
        }
    }
}
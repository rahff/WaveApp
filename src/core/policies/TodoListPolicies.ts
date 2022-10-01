import { Command } from "src/shared/command/Command";
import { AddTodoListItemCommand } from "../commands/todoList/AddTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../commands/todoList/UpdateTodoItemCommand";
import { TodoItem } from "../entities/TodoItem";
import { CanotModifyItemEvent } from "../events/shared/CanotModifyItemEvent";
import { ItemAlreadyExistEvent } from "../events/shared/ItemAlreadyExistEvent";
import { ItemNotExistEvent } from "../events/shared/ItemNotExistEvent";
import { TodoListRepository } from "../ports/driven/TodoListRepository";

export class TodoListPolicies {

    constructor(private repository: TodoListRepository) {}
 
  
    async saveItem(item: TodoItem): Promise<Command> {
        const { description } = item;
        const isExistWithSameDescription = await this.repository.isTodoAlreadyExistByDescription(description);
        if(isExistWithSameDescription){
            return new ItemAlreadyExistEvent("this.todo already exist");
        }
        const savedItem = await this.repository.saveItem(item);
        return new AddTodoListItemCommand(savedItem);
    }

    async deleteItem(itemId: string): Promise<Command> {
        const isExistingTodo = await this.repository.isTodoAlreadyExistById(itemId);
        if(!isExistingTodo) return new ItemNotExistEvent("this todo does not exist");
        return new RemoveTodoListItemCommand(itemId);
    }

    async modifyTodoItem(update: Partial<TodoItem>): Promise<Command> {
        if(!update.id) return new CanotModifyItemEvent("cannot modify without identifier");
        const isExistingTodo = await this.repository.isTodoAlreadyExistById(update.id);
        if(!isExistingTodo) return new ItemNotExistEvent("this todo does not exist");
        const modifiedItem = await this.repository.modifyTodoItem(update);
        return new UpdateTodoItemCommand(modifiedItem);  
    }

    async getTodoList(): Promise<Command> {
        const todoList = await this.repository.getTodoList();
        return new SetTodoListItemsCommand(todoList);
    }
}
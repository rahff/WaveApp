import { todoItemMapper } from "src/core/mappers/entities/TodoItemMapper";
import { ITodoItem } from "src/infra/models/ITodoItem";
import { Command } from "src/shared/command/Command";
import { AddTodoListItemCommand } from "../commands/todoList/AddTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../commands/todoList/UpdateTodoItemCommand";
import { TodoItem } from "../entities/TodoItem";
import { CanotModifyItemEvent } from "../events/shared/CanotModifyItemEvent";
import { ItemAlreadyExistEvent } from "../events/shared/ItemAlreadyExistEvent";
import { ItemNotExistEvent } from "../events/shared/ItemNotExistEvent";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { TodoListRepository } from "../ports/driven/TodoListRepository";

export class TodoListPolicies {

    constructor(private repository: TodoListRepository) {}
 
  
    async applySaveItemPolicies(item: ITodoItem): Promise<Command> {
        try {
            const _item = todoItemMapper(item)
            const { description } = _item.asDto();
            const isExistWithSameDescription = await this.repository.isTodoAlreadyExistByDescription(description);
            if(isExistWithSameDescription){
                return new ItemAlreadyExistEvent("this.todo already exist");
            }
            const savedItem = await this.repository.saveItem(_item.asDto());
            const todoItemEntity = todoItemMapper(savedItem);
            return new AddTodoListItemCommand(todoItemEntity);
        } catch (error: any) {
            return new ErrorEvent(error.message);
        }
    }

    async applyDeleteItemPolicies(itemId: string): Promise<Command> {
        const isExistingTodo = await this.repository.isTodoAlreadyExistById(itemId);
        if(!isExistingTodo) return new ItemNotExistEvent("this todo does not exist");
        return new RemoveTodoListItemCommand(itemId);
    }

    async applyModifyTodoItemPolicies(updated: ITodoItem): Promise<Command> {
        try {
            const upadtedItem = todoItemMapper(updated);
            if(!upadtedItem.getId()) return new CanotModifyItemEvent("cannot modify without identifier");
            const isExistingTodo = await this.repository.isTodoAlreadyExistById(upadtedItem.getId());
            if(!isExistingTodo) return new ItemNotExistEvent("this todo does not exist");
            const modifiedItem = await this.repository.modifyTodoItem(upadtedItem.asDto());
            const todoItemEntity = todoItemMapper(modifiedItem)
            return new UpdateTodoItemCommand(todoItemEntity);  
        } catch (error: any) {
            return new ErrorEvent(error.message);
        }
    }

    async applyGetTodoListPolicies(): Promise<Command> {
        const todoList = await this.repository.getTodoList();
        const todoItemListEntity = todoList.map((item: ITodoItem) => todoItemMapper(item))
        return new SetTodoListItemsCommand(todoItemListEntity);
    }
}
import { todoItemMapper } from "src/core/mappers/entities/TodoItemMapper";
import { ITodoItem } from "src/infra/models/ITodoItem";
import { Action } from "src/shared/actions/Action";
import { AddTodoListItemCommand } from "../commands/todoList/AddTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../commands/todoList/UpdateTodoItemCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { TodoListRepository } from "../ports/driven/TodoListRepository";

export class TodoListUseCases {

    constructor(private repository: TodoListRepository) {}
 
  
    async applySaveItem(item: ITodoItem): Promise<Action> {
        try {
            const _item = todoItemMapper(item)
            const { description } = _item.asDto();
            const isExistWithSameDescription = await this.repository.isTodoAlreadyExistByDescription(description);
            if(isExistWithSameDescription){
                return new ExceptionEvent("this.todo already exist");
            }
            const savedItem = await this.repository.saveItem(_item.asDto());
            const todoItemEntity = todoItemMapper(savedItem);
            return new AddTodoListItemCommand(todoItemEntity);
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    async applyDeleteItem(itemId: string): Promise<Action> {
        try {
            const isExistingTodo = await this.repository.isTodoAlreadyExistById(itemId);
            if(!isExistingTodo) return new ExceptionEvent("this todo does not exist");
            const deletedItemId = await this.repository.deleteItem(itemId);
            return new RemoveTodoListItemCommand(deletedItemId);
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    async applyModifyTodoItem(updated: ITodoItem): Promise<Action> {
        try {
            const upadtedItem = todoItemMapper(updated);
            if(!upadtedItem.getId()) return new ExceptionEvent("cannot modify without identifier");
            const isExistingTodo = await this.repository.isTodoAlreadyExistById(upadtedItem.getId());
            if(!isExistingTodo) return new ExceptionEvent("this todo does not exist");
            const modifiedItem = await this.repository.modifyTodoItem(upadtedItem.asDto());
            const todoItemEntity = todoItemMapper(modifiedItem)
            return new UpdateTodoItemCommand(todoItemEntity);  
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    async applyGetTodoList(): Promise<Action> {
        const todoList = await this.repository.getTodoList();
        const todoItemListEntity = todoList.map((item: ITodoItem) => todoItemMapper(item))
        return new SetTodoListItemsCommand(todoItemListEntity);
    }
}
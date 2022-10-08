import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "src/infra/models/ITodoItem";

export interface TodoListRepository {
    saveItem(item: ITodoItem): Promise<ITodoItem>
    deleteItem(itemId: string): Promise<string>
    modifyTodoItem(updated: ITodoItem): Promise<ITodoItem>;
    getTodoList(): Promise<ITodoItem[]>;
    isTodoAlreadyExistByDescription(description: string): Promise<boolean>;
    isTodoAlreadyExistById(id: string): Promise<boolean>;
}
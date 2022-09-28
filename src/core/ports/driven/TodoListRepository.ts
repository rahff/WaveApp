import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "src/infra/interfaces/ITodoItem";

export interface TodoListRepository {
    saveItem(item: ITodoItem): Promise<TodoItem>
    deleteItem(itemId: string): Promise<string>
    modifyDescriptionItem(itemId: string, update: string): Promise<TodoItem>;
    getTodoList(): Promise<TodoItem[]>;
}
import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "src/infra/interfaces/ITodoItem";

export interface TodoListRepository {
    saveItem(item: ITodoItem): Promise<TodoItem>
    deleteItem(itemId: string): Promise<string>
    modifyTodoItem(update: Partial<TodoItem>): Promise<TodoItem>;
    getTodoList(): Promise<TodoItem[]>;
}
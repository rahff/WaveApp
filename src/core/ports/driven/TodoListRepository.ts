import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "src/infra/interfaces/ITodoItem";

export interface TodoListRepository {
    saveItem(item: ITodoItem): Promise<TodoItem>
}
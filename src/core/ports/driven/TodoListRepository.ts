import { TodoItem } from "src/core/entities/TodoItem";

export interface TodoListRepository {
    saveItem(item: TodoItem): Promise<TodoItem>
    deleteItem(itemId: string): Promise<string>
    modifyTodoItem(update: Partial<TodoItem>): Promise<TodoItem>;
    getTodoList(): Promise<TodoItem[]>;
    isTodoAlreadyExistByDescription(description: string): Promise<boolean>;
    isTodoAlreadyExistById(id: string): Promise<boolean>;
}
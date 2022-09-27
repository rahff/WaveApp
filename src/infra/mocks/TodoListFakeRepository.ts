import { TodoItem } from "src/core/entities/TodoItem";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { ITodoItem } from "../interfaces/ITodoItem";

export class TodoListFakeRepository implements TodoListRepository{

    private data: TodoItem[] = [];

    saveItem(item: ITodoItem): Promise<TodoItem> {
        return new Promise((resolve) => {
            const newItem = new TodoItem("123", item.description);
            this.data.push(newItem);
            resolve(newItem);
        })
    }
}
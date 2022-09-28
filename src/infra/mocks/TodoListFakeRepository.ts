import { TodoItem } from "src/core/entities/TodoItem";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { ITodoItem } from "../interfaces/ITodoItem";

export class TodoListFakeRepository implements TodoListRepository {
    getTodoList(): Promise<TodoItem[]> {
        return new Promise((resolve)=> resolve([new TodoItem("123", "test1"), new TodoItem("456", "test2")]));
    }

    modifyDescriptionItem(itemId: string, update: string): Promise<TodoItem> {
        return new Promise((resolve)=> {
            const item = new TodoItem(itemId, update);
            resolve(item);
        });
    }

    deleteItem(itemId: string): Promise<string> {
        return new Promise((resolve)=> resolve(itemId));
    }

    saveItem(item: ITodoItem): Promise<TodoItem> {
        return new Promise((resolve) => {
            const newItem = new TodoItem("123", item.description);
            resolve(newItem);
        })
    }
}
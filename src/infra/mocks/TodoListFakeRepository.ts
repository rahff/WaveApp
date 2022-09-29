import { TodoItem } from "src/core/entities/TodoItem";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { item1, item2 } from "./fake-data";



export class TodoListFakeRepository implements TodoListRepository {
   
    getTodoList(): Promise<TodoItem[]> {
        return new Promise((resolve)=> resolve([item1, item2]));
    }

    modifyTodoItem(update: Partial<TodoItem>): Promise<TodoItem> {
        return new Promise((resolve)=> {
            const item: TodoItem = {...item2, description: update.description as string};
            resolve(item);
        });
    }

    deleteItem(itemId: string): Promise<string> {
        return new Promise((resolve)=> resolve(itemId));
    }

    saveItem(item: TodoItem): Promise<TodoItem> {
        return new Promise((resolve) => {
            const newItem: TodoItem = {...item, id: "123" };
            resolve(newItem);
        })
    }
}
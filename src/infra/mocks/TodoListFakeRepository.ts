import { TodoItem } from "src/core/entities/TodoItem";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { item1, item2 } from "./fake-data";



export class TodoListFakeRepository implements TodoListRepository {

    isTodoAlreadyExistById(id: string): Promise<boolean> {
        return new Promise((resolve)=> {
            resolve(id === "123" || id === "456");
        })
    }

    isTodoAlreadyExistByDescription(description: string): Promise<boolean> {
        return new Promise((resolve)=> {
            resolve(description === "test1" || description === "test2")
        })
    }
   
    getTodoList(): Promise<TodoItem[]> {
        return new Promise((resolve)=> resolve([item1, item2]));
    }

    modifyTodoItem(updated: TodoItem): Promise<TodoItem> {
        return new Promise((resolve)=> {
            resolve(updated);
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
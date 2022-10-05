import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom, map, Observable, of } from "rxjs";
import { TodoItem } from "src/core/entities/TodoItem";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { DatabaseModule } from "../modules/database.module";

@Injectable({
    providedIn: DatabaseModule
})
export class TodoListRepositoryAdapter implements TodoListRepository {

    constructor(private service: NgxIndexedDBService){}

    async saveItem(item: TodoItem): Promise<TodoItem> {
        return firstValueFrom(this.service.add('todo', item)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async deleteItem(itemId: string): Promise<string> {
        const isDeleted = await firstValueFrom(this.performDeletion(itemId));
        if(!isDeleted) return "";
        return itemId;
    }

    private performDeletion(id: string): Observable<boolean> {
        return this.service.delete<TodoItem>("todo", id)
        .pipe(map(()=> true), catchError(()=> of(false)));
    }

    async modifyTodoItem(updated: TodoItem): Promise<TodoItem> {
        return await firstValueFrom(this.service.update("todo", updated)
        .pipe(catchError(()=> {throw new Error("failed to update")})));
        
    }

    async getTodoList(): Promise<TodoItem[]> {
        return firstValueFrom(this.service.getAll<TodoItem>("todo")
        .pipe(catchError(()=> {throw new Error("something goes wrong")})));
    }

    async isTodoAlreadyExistByDescription(description: string): Promise<boolean> {
        const isExist = await firstValueFrom(this.service.getByIndex("todo", "description", description));
        if(isExist) return true;
        return false;
    }

    async isTodoAlreadyExistById(id: string): Promise<boolean> {
        const isExist = await firstValueFrom(this.service.getByID("todo", id));
        if(isExist) return true;
        return false;
    }

}
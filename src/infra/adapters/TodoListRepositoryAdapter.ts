import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom, map, Observable, of } from "rxjs";
import { TodoListRepository } from "src/core/ports/driven/TodoListRepository";
import { ITodoItem } from "../models/ITodoItem";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generators";


@Injectable({
    providedIn: DatabaseModule
})
export class TodoListRepositoryAdapter implements TodoListRepository {

    constructor(private service: NgxIndexedDBService){}

    async saveItem(item: ITodoItem): Promise<ITodoItem> {
        item.id = generateId();
        return await firstValueFrom(this.service.add('todo', item)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async deleteItem(itemId: string): Promise<string> {
        const isDeleted = await firstValueFrom(this.performDeletion(itemId));
        if(!isDeleted) return "";
        return itemId;
    }

    private performDeletion(id: string): Observable<boolean> {
        return this.service.delete<ITodoItem>("todo", id)
        .pipe(map(()=> true), catchError(()=> of(false)));
    }

    async modifyTodoItem(updated: ITodoItem): Promise<ITodoItem> {
        return await firstValueFrom(this.service.update("todo", updated)
        .pipe(catchError(()=> {throw new Error("failed to update")})));
    }

    async getTodoList(): Promise<ITodoItem[]> {
        return firstValueFrom(this.service.getAll<ITodoItem>("todo")
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
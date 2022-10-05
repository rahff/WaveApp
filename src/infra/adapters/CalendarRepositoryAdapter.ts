import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom, map, Observable, of } from "rxjs";
import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { CalendarRepository } from "src/core/ports/driven/CalendarRepository";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generateId";

@Injectable({
    providedIn: DatabaseModule
})
export class CalendarRepositoryAdapter implements CalendarRepository{

    constructor(private service: NgxIndexedDBService){}

    async getCalendarEvents(): Promise<CalendarEvent[]> {
        return firstValueFrom(this.service.getAll<CalendarEvent>("calendar")
        .pipe(catchError(()=> {throw new Error("something goes wrong")})), 
        {defaultValue: []});
    }

    async saveCalendarEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
        calendarEvent.id = generateId();
        return firstValueFrom(this.service.add("calendar", calendarEvent)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async deleteCalendarEvent(calendarEventId: string): Promise<string> {
        const isDeleted = await firstValueFrom(this.performDeletion(calendarEventId), {defaultValue: false});
        if(isDeleted) return calendarEventId;
        return "";
    }

    private performDeletion(id: string): Observable<boolean> {
        return this.service.delete("calendar", id)
        .pipe(map(()=> true), catchError(()=> of(false)));
    }

    async modifyCalendarEvent(updated: CalendarEvent): Promise<CalendarEvent> {
        return firstValueFrom(this.service.update("calendar", updated)
        .pipe(catchError(()=> {throw new Error("failed to update")})));
    }
}
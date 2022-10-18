import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { ContactItem } from "src/core/entities/ContactItem";
import { TodoItem } from "src/core/entities/TodoItem";
import { User } from "src/core/entities/User";
import { IMessage } from "../models/IMessage";

export const fakeCalendarEvent1 = new CalendarEvent("test1", new Date(2023, 8, 22, 4, 0), new Date(2023, 8, 22, 7, 0), "123");
export const fakeCalendarEvent2 = new CalendarEvent("test2", new Date(2023, 8, 22, 8, 0), new Date(2023, 8, 22, 9, 0), "456z");        
export const fakeCalendarEvent3 = new CalendarEvent("test3", new Date(2023, 8, 22, 9, 5), new Date(2023, 8, 22, 10, 0), "789");
export const fakeEventSameTimeOfEvent1 = new CalendarEvent("new RDV", new Date(2023, 8, 22, 5, 0), new Date(2023, 8, 22, 6, 30), '987');
export const fakeCalendarEventInPast = new CalendarEvent("in past", new Date(2002, 7, 5, 9, 30), new Date(2002, 7, 5, 9, 45), "654");


export const item1 = new TodoItem("test1", "123");
export const item2 = new TodoItem("test2", "456")

export const user1 = new User("Guillaume", "guiguilamenace@gmail.com", "Mot2$asse", "123");
export const conatct1 = new ContactItem("Marks", "Thierry", "titilebaron@gmail.com", "0450424342", "123");
export const conatct2 = new ContactItem("Jacob", "Nils", "nanoudu94@gmail.com", "0450428332", "456");
export const fakeMessage: IMessage = {id: '123', from: 'testtester@gmail.com', content: "Hello world", attachment: null}
export const fakeMessage2: IMessage = {id: '456', from: 'testtester2@gmail.com', content: "Salutation", attachment: null}
export const newMessageList: IMessage[] = [fakeMessage, fakeMessage2];
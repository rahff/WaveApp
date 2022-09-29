import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { ContactItem } from "src/core/entities/ContactItem";
import { TodoItem } from "src/core/entities/TodoItem";
import { User } from "src/core/entities/User";

export const fakeCalendarEvent1: CalendarEvent = {
    id: "123", 
    eventDate: new Date(2018, 8, 22), 
    eventTime: {hour: 4, minute: 0}, 
    title: "test1"
}

export const fakeCalendarEvent2: CalendarEvent = {
    id: "456", 
    eventDate: new Date(2022, 8, 22), 
    eventTime: {hour: 8, minute: 0}, 
    title: "test2"
}

export const item1: TodoItem = {
    id: "123",
    description: "test1",
    status: false
}

export const item2: TodoItem = {
    id: "456",
    description: "test2",
    status: false
}

export const user1: User = {
    name: "Tell", 
    firstname: "Guillaume", 
    email: "guiguilamenace@gmail.com"
}

export const conatct1: ContactItem = { id: "123", name: "Marks", firstname: "Thierry", email: "titilebaron@gmail.com", tel: "0450424342"};
export const conatct2: ContactItem = { id: "456", name: "Jacob", firstname: "Nils", email: "nanoudu94@gmail.com", tel: "0450428332"};
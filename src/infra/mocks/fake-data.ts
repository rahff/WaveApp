import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { ContactItem } from "src/core/entities/ContactItem";
import { TodoItem } from "src/core/entities/TodoItem";
import { User } from "src/core/entities/User";

export const fakeCalendarEvent1: CalendarEvent = {
        id: "123", 
        start: new Date(2023, 8, 22, 4, 0), 
        end: new Date(2023, 8, 22, 7, 0),
        title: "test1"
    }

export const fakeCalendarEvent2: CalendarEvent = {
        id: "456",
        start: new Date(2023, 8, 22, 8, 0),
        end: new Date(2023, 8, 22, 9, 0),
        title: "test2"
    }

export const fakeCalendarEvent3: CalendarEvent = {
    id: "456",
    start: new Date(2023, 8, 22, 9, 5),
    end: new Date(2023, 8, 22, 10, 0), 
    title: "test3"
}

export const fakeEventSameTimeOfEvent1: CalendarEvent = {
    id: "963",
    start: new Date(2023, 8, 22, 5, 0), 
    end: new Date(2023, 8, 22, 6, 30),
    title: "new RDV"
}

export const fakeCalendarEventInPast: CalendarEvent = {
    id: "258", 
    title: "in past", 
    start: new Date(2002, 7, 5, 9, 30),
    end: new Date(2002, 7, 5, 9, 45)
}

export const fakeEventEndbeforeStart: CalendarEvent = {
    id: "259", 
    title: "end before", 
    start: new Date(2022, 12, 5, 9, 30),
    end: new Date(2022, 12, 5, 8, 5)
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
    id: "123",
    name: "Tell", 
    firstname: "Guillaume", 
    email: "guiguilamenace@gmail.com",
    password: "Mot2$asse"
}

export const conatct1: ContactItem = { id: "123", name: "Marks", firstname: "Thierry", email: "titilebaron@gmail.com", tel: "0450424342"};
export const conatct2: ContactItem = { id: "456", name: "Jacob", firstname: "Nils", email: "nanoudu94@gmail.com", tel: "0450428332"};
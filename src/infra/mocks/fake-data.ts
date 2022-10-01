import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { ContactItem } from "src/core/entities/ContactItem";
import { TodoItem } from "src/core/entities/TodoItem";
import { User } from "src/core/entities/User";

export const fakeCalendarEvent1: CalendarEvent = {
    id: "123", 
    start: {
       year: 2023, month: 8, day: 22, hour: 4, minute: 0
    }, 
    end: {
        year: 2023, month: 8, day: 22, hour: 7, minute: 0
    }, 
    title: "test1"
    }

export const fakeCalendarEvent2: CalendarEvent = {
        id: "456",
        start: {
            year: 2023, month: 8, day: 22, hour: 8, minute: 0
        },
        end: {
            year: 2023, month: 8, day: 22, hour: 9, minute: 0
        },
        title: "test2"
    }

export const fakeCalendarEvent3: CalendarEvent = {
    id: "456",
    start: {
      year: 2023, month: 8, day: 22, hour: 9, minute: 5
    },
    end: {
        year: 2023, month: 8, day: 22, hour: 10, minute: 0
    }, 
    title: "test3"
}

export const fakeEventSameTimeOfEvent1: CalendarEvent = {
    id: "963",
    start: {
        year: 2023, month: 8, day: 22, hour: 5, minute: 0
    }, 
    end: {
        year: 2023, month: 8, day: 22, hour: 6, minute: 30
    }, 
    title: "new RDV"}

export const fakeCalendarEventInPast: CalendarEvent = {
    id: "258", 
    title: "in past", 
    start: {
        year: 2022, month: 7, day: 5, hour: 9, minute: 30
    },
    end: {
        year: 2022, month: 7, day: 5, hour: 9, minute: 45
    }
}

export const fakeEventEndbeforeStart: CalendarEvent = {
    id: "259", 
    title: "end before", 
    start: {
        year: 2022, month: 12, day: 5, hour: 9, minute: 30}, 
        end: {year: 2022, month: 12, day: 5, hour: 8, minute: 5
        }
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
    email: "guiguilamenace@gmail.com",
    password: "Mot2$asse"
}

export const conatct1: ContactItem = { id: "123", name: "Marks", firstname: "Thierry", email: "titilebaron@gmail.com", tel: "0450424342"};
export const conatct2: ContactItem = { id: "456", name: "Jacob", firstname: "Nils", email: "nanoudu94@gmail.com", tel: "0450428332"};

export type DateTime = {year: number, month: number, day: number, hour: number, minute: number }


export interface CalendarEvent {
    id: string;
    start: DateTime;
    end: DateTime;
    title: string;
}
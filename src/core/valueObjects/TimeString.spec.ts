import { TimeString } from "./TimeString"

describe('TimeString', ()=>{
    const timeStringFactory = (time: string) => () => new TimeString(time);
    it('should be valid', ()=>{
        const timeString = new TimeString("48:00");
        expect(timeString).toBeInstanceOf(TimeString);
        expect(timeStringFactory("148:00")).toThrowError("invalid notification time");
        expect(timeStringFactory("48:001")).toThrowError("invalid notification time");
        expect(timeStringFactory("0h15")).toThrowError("invalid notification time");
        
    })
})
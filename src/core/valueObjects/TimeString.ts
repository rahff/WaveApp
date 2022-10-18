export class TimeString {
    constructor(private time: string){
        if(this.isValidTime(this.time)) 
            throw new Error("invalid notification time"); 
    }

    private isValidTime(time: string): boolean {
        return !/[0-9]?[0-9]{1}:0?[0-5]{1}[0-9]{1}/.test(time)
        || time.split(":")[0].length > 2
        || time.split(":")[1].length > 2;
    }

    public getValue(): string {
        return this.time;
    }

    public getHours(): number {
        return Number(this.time.split(":")[0])
    }

    public getMinutes(): number {
        return Number(this.time.split(":")[1])
    }
}
export abstract class Command {
    constructor(protected name: string, protected payload: any){}

    public getName(): string {
        return this.name;
    }

    public getPayload(): any {
        return this.payload;
    }
}
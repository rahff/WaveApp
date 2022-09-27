export abstract class Command<T> {
    constructor(protected name: string, protected payload: any){}

    public getName(): string {
        return this.name;
    }

    public getPayload(): T {
        return this.payload;
    }
}
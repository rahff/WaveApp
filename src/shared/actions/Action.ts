export abstract class Action {
    constructor(protected name: string, protected payload: any){}

    public getName(): string {
        return this.name;
    }

    public getPayload(): any {
        return this.payload;
    }
}

export abstract class Command extends Action {}
export abstract class _Event extends Action {}
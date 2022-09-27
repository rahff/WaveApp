export class TodoItem {

    private status: boolean = false;

    constructor(private id: string, public description: string){}
    
    public getId(): string {
        return this.id;
    }

    public getStatus(): boolean {
        return this.status
    }

    public done(): void {
        this.status = true;
    }

    public getDescription(): string {
        return this.description;
    }
}
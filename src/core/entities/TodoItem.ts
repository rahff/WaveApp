import { ITodoItem } from "../../infra/models/ITodoItem";

export class TodoItem {

    constructor(private description: string, private id: string, private status = false){}

    getId(): string {
        return this.id
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): boolean {
        return this.status;
    }

    setStatus(status: boolean): void {
        this.status = status;
    }

    asDto(): ITodoItem {
        return {
            description: this.description,
            status: this.status,
            id: this.id
        }
    }
}
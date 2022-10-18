import { IMessage } from "src/infra/models/IMessage";

export class _Message {

    constructor(private from: string, 
                private content: string, 
                private id: string, 
                private attachment?: any){}

    public getId(): string {
        return this.id;
    }

    public asDto(): IMessage {
        return {
            from: this.from,
            content: this.content,
            id: this.id,
            attachment: this.attachment
        }
    }
}
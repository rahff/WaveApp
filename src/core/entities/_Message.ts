import { IMessage } from "src/infra/models/IMessage";
import { ContactItem } from "./ContactItem";


export class _Message {

    constructor(private from: ContactItem, 
                private content: string, 
                private id: string, 
                private attachment?: any){}

    public getId(): string {
        return this.id;
    }

    public asDto(): IMessage {
        return {
            from: this.from.asDto(),
            content: this.content,
            id: this.id,
            attachment: this.attachment
        }
    }
}

import { IMessage } from "../../infra/models/IMessage";
import { ContactItem } from "./ContactItem";


export class _Message {

    constructor(private to: ContactItem, 
                private content: string, 
                private id: string, 
                private attachment?: any){}

    public getId(): string {
        return this.id;
    }

    public asDto(): IMessage {
        return {
            to: this.to.asDto(),
            content: this.content,
            id: this.id,
            attachment: this.attachment
        }
    }
}
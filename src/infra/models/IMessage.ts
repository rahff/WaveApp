import { IContactItem } from "./IContactIem";

export interface IMessage {
    to: IContactItem;
    content: string;
    attachment: any;
    id: string;
}
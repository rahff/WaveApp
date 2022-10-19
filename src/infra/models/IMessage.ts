import { IContactItem } from "./IContactIem";

export interface IMessage {
    from: IContactItem;
    content: string;
    attachment: any;
    id: string;
}
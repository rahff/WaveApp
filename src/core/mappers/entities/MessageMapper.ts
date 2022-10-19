import { _Message } from "src/core/entities/_Message";
import { IMessage } from "src/infra/models/IMessage";
import { contactMapper } from "./ContactMapper";

export const messageMapper = (pojo: IMessage): _Message => {
    return new _Message(contactMapper(pojo.from), pojo.content, pojo.id, pojo.attachment);
}

import { IMessage } from "../../../infra/models/IMessage";
import { _Message } from "../../entities/_Message";
import { contactMapper } from "./ContactMapper";

export const messageMapper = (pojo: IMessage): _Message => {
    return new _Message(contactMapper(pojo.to), pojo.content, pojo.id, pojo.attachment);
}
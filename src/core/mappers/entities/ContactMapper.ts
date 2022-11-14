import { IContactItem } from "../../../infra/models/IContactIem";
import { ContactItem } from "../../entities/ContactItem";


export const contactMapper = (contactPojo: IContactItem): ContactItem => {
    return new ContactItem(contactPojo.username, contactPojo.email, contactPojo.id);
}
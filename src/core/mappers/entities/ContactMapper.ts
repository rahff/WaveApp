import { ContactItem } from "src/core/entities/ContactItem";
import { IContactItem } from "../../../infra/models/IContactIem";

export const contactMapper = (contactPojo: IContactItem): ContactItem => {
    return new ContactItem(contactPojo.name, contactPojo.firstname, contactPojo.email, contactPojo.tel, contactPojo.id);
}
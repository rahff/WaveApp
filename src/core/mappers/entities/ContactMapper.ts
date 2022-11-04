import { IContactItem } from "../../../infra/models/IContactIem";
import { ContactItem } from "../../entities/ContactItem";


export const contactMapper = (contactPojo: IContactItem): ContactItem => {
    return new ContactItem(contactPojo.name, contactPojo.email, contactPojo.tel, contactPojo.id);
}
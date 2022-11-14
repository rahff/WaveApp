import { IContactItem } from "../../infra/models/IContactIem";
import { User } from "./User";



export class ContactItem extends User{


    constructor(username: string, email: string, id: string){
        super(username, email, id);
        this.photo = `${username}${id}.png`
    }

    public override asDto(): IContactItem {
        return {
            username: this.username,
            email: this.email,
            id: this.id,
            photo: this.photo
        }
    }
}
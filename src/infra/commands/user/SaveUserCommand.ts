import { Command } from "../../../shared/actions/Action";
import { IUser } from "../../models/IUser";





export class SaveUserCommand extends Command {
    constructor(payload: IUser){
        super("saveUser", payload);
    }
}
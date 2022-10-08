import { IUser } from "src/infra/models/IUser";
import { Command } from "src/shared/command/Command";



export class SaveUserCommand extends Command {
    constructor(payload: IUser){
        super("saveUser", payload);
    }
}
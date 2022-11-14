import { Base64File } from "../../../../shared/Base64File";
import { Command } from "../../../shared/actions/Action";

export class SaveUserPhotoCommand extends Command {
    constructor(payload: Base64File){
        super('saveUserPhoto', payload);
    }
}
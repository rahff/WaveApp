import { Base64File } from "../../../../shared/Base64File";
import { Command } from "../../../shared/actions/Action";

export class SaveContactInfoCommand  extends Command {
    constructor(payload: Base64File){
        super("saveContactInfo", payload);
    }
}
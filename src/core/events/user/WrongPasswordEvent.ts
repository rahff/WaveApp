import { Command } from "src/shared/command/Command";


export class WrongPasswordEvent extends Command {
    constructor(){
        super("wrongPassword", true);
    }
}
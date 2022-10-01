import { Command } from "src/shared/command/Command";

export class CanotModifyItemEvent extends Command {
    constructor(payload: string){
        super("canNotModify", payload);
    }
}
import { _Event } from "src/shared/actions/Action";

export class UserConnexionEvent extends _Event {
    constructor(){
        super("userConnexion", false)
    }
}
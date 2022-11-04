import { _Event } from "../../../shared/actions/Action";



export class SignupEvent extends _Event {

    constructor(payload: boolean){
        super("signupEvent", payload);
    }
}
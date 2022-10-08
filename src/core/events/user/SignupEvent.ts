import { _Event } from "src/shared/actions/Action";


export class SignupEvent extends _Event {

    constructor(payload: boolean){
        super("signupEvent", payload);
    }
}
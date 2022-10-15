
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { ContactListPolicies } from "../policies/ContactListPolicies";
import { ContactListRepository } from "../ports/driven/ContactListRepository";
import { Action } from "src/shared/actions/Action";



export class ContactListEffect implements EffectCreator {

    private validationPolicy: ContactListPolicies;

    constructor(private repository: ContactListRepository){
        this.validationPolicy = new ContactListPolicies(this.repository)
    }
    
    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "getContacts":
                try {
                    return this.validationPolicy.applyGetContactListPolicies();
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "saveContact":
                try {
                    return await this.validationPolicy.applySaveContactPolicies(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "deleteContact":
                try {
                    return await this.validationPolicy.applyDeleteContactPolicies(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "modifyContact": 
                try {
                    return await this.validationPolicy.applyModifyContactPolicies(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
                
            default: throw new CommandNotFoundException();
        }
    }

}
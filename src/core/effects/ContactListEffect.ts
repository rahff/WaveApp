
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { ContactListUseCases } from "../use-cases/ContactListUseCases";
import { ContactListRepository } from "../ports/driven/ContactListRepository";
import { Action } from "src/shared/actions/Action";



export class ContactListEffect implements EffectCreator {

    private validationPolicy: ContactListUseCases;

    constructor(private repository: ContactListRepository){
        this.validationPolicy = new ContactListUseCases(this.repository)
    }
    
    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "getContacts":
                try {
                    return this.validationPolicy.applyGetContactList();
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "saveContact":
                try {
                    return await this.validationPolicy.applySaveContact(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "deleteContact":
                try {
                    return await this.validationPolicy.applyDeleteContact(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "modifyContact": 
                try {
                    return await this.validationPolicy.applyModifyContact(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
                
            default: throw new CommandNotFoundException();
        }
    }

}
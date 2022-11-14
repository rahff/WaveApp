
import { ContactListFakeRepository } from "../../infra/mocks/ContactListFakeRepository";
import { IContactItem } from "../../infra/models/IContactIem";
import { ContactListUseCases } from "./ContactListUseCases"


const contactWithSameEmailThanAnother: IContactItem = { id: "956", username: "Fritz", email: "titilebaron@gmail.com", photo: "test.png"};

describe('ContactListUseCases', ()=>{
    let policies:ContactListUseCases;

    beforeEach(()=>{
        policies = new ContactListUseCases(new ContactListFakeRepository());
    })

    it('should verify that no email or tel duplication', async ()=> {
        const commandResult = await policies.applySaveContact(contactWithSameEmailThanAnother);
        expect(commandResult.getPayload()).toEqual("this contact already exist with this tel or email")
    });

    it('should verify that item does exist before try to delete it', async ()=> {
        const commandResult = await policies.applyDeleteContact("noExistingId");
        expect(commandResult.getPayload()).toEqual("this contact does not exist")
    })
})
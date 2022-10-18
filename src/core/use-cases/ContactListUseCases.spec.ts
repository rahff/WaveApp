import { ContactListFakeRepository } from "src/infra/mocks/ContactListFakeRepository";
import { ContactListUseCases } from "./ContactListUseCases"


const contactWithSameEmailThanAnother = { id: "956", name: "Fritz", firstname: "Helmut", email: "titilebaron@gmail.com", tel: "0457428332"};

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

    it('should verify that payload have an id before try to modify it', async ()=> {
        const commandResult = await policies.applyModifyContact({...contactWithSameEmailThanAnother, id: "", email: "otheremail@gmail.com"});
        expect(commandResult.getPayload()).toEqual("cannot modify item without identifier");
    })
})
import { ContactListFakeRepository } from "src/infra/mocks/ContactListFakeRepository";
import { ContactListPolicies } from "./ContactListPolicies"


const contactWithSameEmailThanAnother = { id: "956", name: "Fritz", firstname: "Helmut", email: "titilebaron@gmail.com", tel: "0457428332"};

describe('ContactListPolicies', ()=>{
    let policies:ContactListPolicies;

    beforeEach(()=>{
        policies = new ContactListPolicies(new ContactListFakeRepository());
    })

    it('should verify that no email or tel duplication', async ()=> {
        const commandResult = await policies.applySaveContactPolicies(contactWithSameEmailThanAnother);
        expect(commandResult.getPayload()).toEqual("this contact already exist with this tel or email")
    });

    it('should verify that item does exist before try to delete it', async ()=> {
        const commandResult = await policies.applyDeleteContactPolicies("noExistingId");
        expect(commandResult.getPayload()).toEqual("this contact does not exist")
    })

    it('should verify that payload have an id before try to modify it', async ()=> {
        const commandResult = await policies.applyModifyContactPolicies({email: "otheremail@gmail.com"});
        expect(commandResult.getPayload()).toEqual("cannot modify item without identifier");
    })
})
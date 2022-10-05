import { TestBed } from "@angular/core/testing";
import { ContactItem } from "src/core/entities/ContactItem";
import { DatabaseModule } from "../modules/database.module";
import { generateEmail, generateId } from "../utils/generateId";
import { ContactListRepositoryAdapter } from "./ContactListRepositoryAdapter";

const generatedEmail = generateEmail();
const generatedTel = generateId();
const itemRef = {name: "Jamy", firstname: "Fred", email: generatedEmail, id: "", tel: generatedTel }

describe("ContactListRepositoryAdapter", ()=> {

    let repository: ContactListRepositoryAdapter;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule
            ],
        })
        repository = TestBed.inject(ContactListRepositoryAdapter);
    })

    it('should be created', ()=>{
        expect(repository).toBeTruthy();
    });

    it("should save a contact item", async ()=> {
        const newContact = await repository.saveContact(itemRef);
        expect(newContact.email).toEqual(generatedEmail);
    });

    it('should get the contact list', async ()=>{
        const contactList = await repository.getContactList();
        expect(contactList.length).toBeGreaterThan(0);
    })

    it("should delete a item", async ()=> {
        const ref: ContactItem = {...itemRef, name: "tester", email: generateEmail(), tel: generateEmail()};
        const { id } = await repository.saveContact(ref);
        const expectedId = await repository.deleteContact(id);
        expect(expectedId).toBeInstanceOf(String);
        const list = await repository.getContactList();
        expect(list).not.toContain(ref);
    });

    it('should modify an item', async ()=>{
        const ref: ContactItem = { id: "itemToModify", name: "tester", firstname: "beta", email: generateEmail(), tel: generateEmail()};
        const { id } = await repository.saveContact(ref);
        const upadtedItem = await repository.modifyContact({...ref, id, name: "modified"});
        expect(upadtedItem.name).toBe("modified");
    });

    it('should verify existance of value in db', async ()=>{
        const _generatedEmail = generateEmail();
        const _generatedTel = generateId();
        await repository.saveContact({...itemRef, id: generateId(),  email: _generatedEmail, tel: generateId()});
        await repository.saveContact({...itemRef, id: generateId(), tel: _generatedTel, email: generateEmail()});
        const isExistingValues = await repository.isExistingContactByValues("notExistingEmail@gmail.com", "0236333210");
        expect(isExistingValues).toBeFalse();
        const isExistingValues2 = await repository.isExistingContactByValues(_generatedEmail, "0236333210");
        expect(isExistingValues2).toBeTrue();
        const isExistingValues3 = await repository.isExistingContactByValues("notExistingEmail@gmail.com", _generatedTel);
        expect(isExistingValues3).toBeTrue();
    })

    it('should verify existance of item by id', async ()=> {
        const _id = generateId();
        const {id} = await repository.saveContact({...itemRef, id: _id,  email: generateEmail(), tel: generateId()});
        const isExisting = await repository.isExistingContactById(id);
        expect(isExisting).toBeTrue();
        const isExisting2 = await repository.isExistingContactById("__notExistingId__");
        expect(isExisting2).toBeFalse();
    })
})
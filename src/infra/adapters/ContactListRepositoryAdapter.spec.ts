import { TestBed } from "@angular/core/testing";
import { ContactItem } from "src/core/entities/ContactItem";
import { IContactItem } from "../models/IContactIem";
import { DatabaseModule } from "../modules/database.module";
import { generateEmail, generateId, generateTel } from "../utils/generators";
import { ContactListRepositoryAdapter } from "./ContactListRepositoryAdapter";

const generatedEmail = generateEmail();
const generatedTel = generateTel();
const itemRef: IContactItem = {name: "Jamy", email: generatedEmail, id: "", tel: generatedTel };
const itemRef2: IContactItem = {name: "test", id: generateId(), email: generateEmail(), tel: generateTel()};

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
        const newContact = await repository.saveContact(itemRef2);
        const contactList = await repository.getContactList();
        expect(contactList.length).toBeGreaterThan(0);
    })

    it("should delete a item", async ()=> {
        const ref: IContactItem = {...itemRef, name: "tester", email: generateEmail(), tel: generateTel()};
        const savedContact = await repository.saveContact(ref);
        const expectedId = await repository.deleteContact(savedContact.id);
        expect(expectedId).toBeInstanceOf(String);
        const list = await repository.getContactList();
        expect(list).not.toContain(ref);
    });

    it('should modify an item', async ()=>{
        const ref = new ContactItem("tester", generateEmail(), generateTel(), "itemToModifyId")
        const savedContact = await repository.saveContact(ref.asDto());
        const upadtedItem = await repository.modifyContact({...ref.asDto(), id: savedContact.id, name: "modified"});
        expect(upadtedItem.name).toBe("modified");
    });

    it('should verify existance of value in db', async ()=>{
        const _generatedEmail = generateEmail();
        const _generatedTel = generateTel();
        await repository.saveContact({...itemRef, id: generateId(),  email: _generatedEmail, tel: generateTel()});
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
        const savedContact = await repository.saveContact({...itemRef, id: _id,  email: generateEmail(), tel: generateTel()});
        const isExisting = await repository.isExistingContactById(savedContact.id);
        expect(isExisting).toBeTrue();
        const isExisting2 = await repository.isExistingContactById("__notExistingId__");
        expect(isExisting2).toBeFalse();
    })
})
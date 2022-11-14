import { TestBed } from "@angular/core/testing";
import { IContactItem } from "../models/IContactIem";
import { DatabaseModule } from "../modules/database.module";
import { generateEmail, generateId } from "../utils/generators";
import { ContactListRepositoryAdapter } from "./ContactListRepositoryAdapter";


const generatedEmail = generateEmail();
const itemRef: IContactItem = {username: "Jamy", email: generatedEmail, id: generateId(), photo: ''};
const itemRef2: IContactItem = {username: "test", id: generateId(), email: generateEmail(), photo: ''};


describe("ContactListRepositoryAdapter", ()=> {

    let repository: ContactListRepositoryAdapter;
    let fileSystemBridgeSpy: any;

    beforeEach(()=> {
        fileSystemBridgeSpy = jasmine.createSpyObj("FileSystemBridge", ["dispatch"])
        TestBed.configureTestingModule({
            imports: [DatabaseModule],
            providers: [
                {
                    provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
                }
            ]
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
        const ref: IContactItem = {...itemRef, username: "tester", email: generateEmail(), id: generateId()};
        const savedContact = await repository.saveContact(ref);
        const expectedId = await repository.deleteContact(savedContact.id);
        expect(expectedId).toBeInstanceOf(String);
        const list = await repository.getContactList();
        expect(list).not.toContain(ref);
    });

    it('should verify existance of value in db', async ()=>{
        const _generatedEmail = generateEmail();
        await repository.saveContact({...itemRef, id: generateId(), email: _generatedEmail});
        const isExistingValues = await repository.isExistingContactByValues("notExistingEmail@gmail.com");
        expect(isExistingValues).toBeFalse();
    })

    it('should verify existance of item by id', async ()=> {
        const _id = generateId();
        const savedContact = await repository.saveContact({...itemRef, id: _id,  email: generateEmail()});
        const isExisting = await repository.isExistingContactById(savedContact.id);
        expect(isExisting).toBeTrue();
        const isExisting2 = await repository.isExistingContactById("__notExistingId__");
        expect(isExisting2).toBeFalse();
    })
})
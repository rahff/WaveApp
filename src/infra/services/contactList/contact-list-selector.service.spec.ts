import { SetContactListCommand } from 'src/core/commands/contactList/SetContactListCommand';
import { ContactListStateContainer } from 'src/core/containers/contactList/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { ContactListFakeRepository } from 'src/infra/mocks/ContactListFakeRepository';
import { conatct1, conatct2 } from 'src/infra/mocks/fake-data';
import { IContactItem } from 'src/infra/models/IContactIem';
import { ContactListSelectorService } from './contact-list-selector.service';



describe('ContactListSelectorService', () => {
  let service: ContactListSelectorService;
  let stateContainer: ContactListStateContainer;
  beforeEach(() => {
    service = new ContactListSelectorService();
    stateContainer = new ContactListStateContainer(new ContactListEffect(new ContactListFakeRepository()), service);
    stateContainer.dispatch(new SetContactListCommand([conatct1, conatct2]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe state of container', ()=>{
    service.getContactList().subscribe((list: IContactItem[])=>{
      expect(list).toEqual(stateContainer.getState().contacts.map((item)=> item.asDto()));
    })
    service.getSuccessSaveEvent().subscribe((successEvent: boolean)=>{
      expect(successEvent).toEqual(stateContainer.getState().onSuccessSave)
    })
    service.getContactItem(conatct1.getEmail()).subscribe((contact: IContactItem)=> {
      expect(contact).toEqual(conatct1.asDto())
    })

  })
});

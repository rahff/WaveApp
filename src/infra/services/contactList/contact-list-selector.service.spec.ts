import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { ContactListFakeRepository } from 'src/infra/mocks/ContactListFakeRepository';
import { IContactItem } from 'src/infra/models/IContactIem';
import { ContactListSelectorService } from './contact-list-selector.service';



describe('ContactListSelectorService', () => {
  let service: ContactListSelectorService;
  let stateContainer: ContactListStateContainer;
  beforeEach(() => {
    service = new ContactListSelectorService();
    stateContainer = new ContactListStateContainer(new ContactListEffect(new ContactListFakeRepository()), service)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe state of container', ()=>{
    service.getContactList().subscribe((list: IContactItem[])=>{
      expect(list).toEqual(stateContainer.getState().contacts.map((item)=> item.asDto()));
    })
  })
});

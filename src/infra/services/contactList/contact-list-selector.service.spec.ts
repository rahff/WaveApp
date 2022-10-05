import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { ContactItem } from 'src/core/entities/ContactItem';
import { ContactListFakeRepository } from 'src/infra/mocks/ContactListFakeRepository';
import { ContactListSelectorService } from './contact-list-selector.service';



describe('ContactListSelectorService', () => {
  let service: ContactListSelectorService;
  let stateContainer: ContactListStateContainer;
  beforeEach(() => {
    stateContainer = new ContactListStateContainer(new ContactListEffect(new ContactListFakeRepository()))
    service = new ContactListSelectorService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe state of container', ()=>{
    service.getContactList().subscribe((list: ContactItem[])=>{
      expect(list).toEqual(stateContainer.getState().contacts);
    })
  })
});

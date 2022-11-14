import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SaveContactItemCommand } from '../../../core/commands/contactList/SaveContactItemCommand';
import { SetContactListCommand } from '../../../core/commands/contactList/SetContactListCommand';
import { ContactListStateContainer } from '../../../core/containers/contactList/ContactListStateContainer';
import { ContactListEffect } from '../../../core/effects/ContactListEffect';
import { DeleteContactItemCommand } from '../../commands/contactList/DeleteContactItemCommand';
import { GetContactListCommand } from '../../commands/contactList/GetContactListCommand';
import { SaveContactInfoCommand } from '../../commands/contactList/SaveContactInfoCommand';
import { GenericEventHandledEvent } from '../../events/GenericEventHandledEvent';
import { ContactListFakeRepository } from '../../mocks/ContactListFakeRepository';
import { conatct1, conatct2 } from '../../mocks/fake-data';
import { ContactListDispatcherService } from './contact-list-dispatcher.service';
import { ContactListSelectorService } from './contact-list-selector.service';



describe('ContactListDispatcherService', () => {
  let service: ContactListDispatcherService;
  let stateContainer: ContactListStateContainer;
  const effectCreator = new ContactListEffect(new ContactListFakeRepository());
  const stateSelector = new ContactListSelectorService()
  beforeEach(() => {
    stateContainer = new ContactListStateContainer(effectCreator, stateSelector);
    service = new ContactListDispatcherService(stateContainer);
    stateContainer.dispatch(new SetContactListCommand([conatct1]))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getContactList command', fakeAsync(()=>{
    service.dispatch(new GetContactListCommand());
    flushMicrotasks();
    expect(stateContainer.getState().contacts).toEqual([conatct1, conatct2])
  }));

  it('should dispatch saveContactItemCommand', fakeAsync(()=>{
    service.dispatch(new SaveContactItemCommand(conatct2.asDto()));
    flushMicrotasks();
    expect(stateContainer.getState().contacts[1]).toEqual(conatct2);
  }));


  it('should dispatch deleteContact command', fakeAsync(()=>{
    service.dispatch(new DeleteContactItemCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().contacts).toEqual([]);
  }));

  it('should dispatch ItemNotExistEvent', fakeAsync(()=>{
    service.dispatch(new DeleteContactItemCommand("987"));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this contact does not exist"});
  }))

  it('should dispatch saveContactInfo command', fakeAsync(()=>{
    service.dispatch(new SaveContactInfoCommand({filename: "test-info.txt", data: "eeyeyeyb..."}));
    flushMicrotasks();
    console.log("exception ", stateContainer.getState().onException);
    expect(stateContainer.getState().onSuccessSave).toBeTrue();
  }))
});

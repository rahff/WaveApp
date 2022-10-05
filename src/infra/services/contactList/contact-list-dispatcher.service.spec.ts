import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetContactListCommand } from 'src/core/commands/contactList/SetContactListCommand';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { DeleteContactItemCommand } from 'src/infra/commands/contactList/DeleteContactItemCommand';
import { GetContactListCommand } from 'src/infra/commands/contactList/GetContactListCommand';
import { ModifyContactItemCommand } from 'src/infra/commands/contactList/ModifyContactItemCommand';
import { SaveContactItemCommand } from 'src/infra/commands/contactList/SaveContactItemCommand';
import { ContactListFakeRepository } from 'src/infra/mocks/ContactListFakeRepository';
import { conatct1, conatct2 } from 'src/infra/mocks/fake-data';
import { ContactListDispatcherService } from './contact-list-dispatcher.service';



describe('ContactListDispatcherService', () => {
  let service: ContactListDispatcherService;
  let stateContainer: ContactListStateContainer;
  const effectCreator = new ContactListEffect(new ContactListFakeRepository());

  beforeEach(() => {
    stateContainer = new ContactListStateContainer(effectCreator);
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
    service.dispatch(new SaveContactItemCommand(conatct2));
    flushMicrotasks();
    expect(stateContainer.getState().contacts[1]).toEqual(conatct2);
  }));

  it('should dispatch contact already exist event when user tries to save a contact with same email or tel', fakeAsync(()=>{
    service.dispatch(new SaveContactItemCommand({...conatct1, id: "456", tel: "0789698545"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this contact already exist with this tel or email"});
  }))

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

  it('should dispatch modifyContact command', fakeAsync(()=>{
    service.dispatch(new ModifyContactItemCommand({...conatct1, tel: "0412121222"}));
    flushMicrotasks();
    expect(stateContainer.getState().contacts[0].tel).toBe("0412121222");
  }))

  it('should dispatch cannot modify item event when there is not id in payload', fakeAsync(()=>{
    service.dispatch(new ModifyContactItemCommand({...conatct1, id: "", tel: "0412121222"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "cannot modify item without identifier"});
  }))
});

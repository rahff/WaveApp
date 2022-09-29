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

  it('should dispatch deleteContact command', fakeAsync(()=>{
    service.dispatch(new DeleteContactItemCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().contacts).toEqual([]);
  }));

  it('should dispatch modifyContact command', fakeAsync(()=>{
    service.dispatch(new ModifyContactItemCommand({...conatct1, tel: "0412121222"}));
    flushMicrotasks();
    expect(stateContainer.getState().contacts[0].tel).toBe("0412121222");
  }))
});

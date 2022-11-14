import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SaveUserCommand } from '../../commands/user/SaveUserCommand';
import { UserFakeRepository } from '../../mocks/UserFakeRepository';
import { UserDispatcherService } from './user-dispatcher.service';
import { UserSelectorService } from './user-selector.service';
import { UserStateContainer } from '../../../core/containers/user/UserStateContainer';
import { UserEffect } from '../../../core/effects/UserEffect';
import { GetUserCommand } from '../../commands/user/GetUserCommand';
import { user1 } from '../../mocks/fake-data';
import { SaveUserPhotoCommand } from '../../commands/user/SaveUserPhotoCommand';
import { GenericEventHandledEvent } from '../../events/GenericEventHandledEvent';



describe('UserDispatcherService', () => {
  let service: UserDispatcherService;
  let stateContainer: UserStateContainer;
  const effectCreator = new UserEffect(new UserFakeRepository());
  const stateSelector = new UserSelectorService()
  beforeEach(() => {
    stateContainer = new UserStateContainer(effectCreator, stateSelector);
    service = new UserDispatcherService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch get user command', fakeAsync(()=>{
    service.dispatch(new GetUserCommand());
    flushMicrotasks();
    expect(stateContainer.getState().user).toBeTruthy();
  }));

  it('should dispatch saveUser command', fakeAsync(()=>{
    service.dispatch(new SaveUserCommand(user1.asDto()));
    flushMicrotasks();
    expect(stateContainer.getState().user).toEqual(user1);
    expect(stateContainer.getState().onException).toBeNull();
  }));

  it('should dispatch saveUserPhoto command', fakeAsync(()=>{
    service.dispatch(new SaveUserPhotoCommand({filename: "user.png", data: ""}));
    flushMicrotasks();
    expect(stateContainer.getState().photoSavedEvent).toBeTrue();
  }));
  
  it('should dispatch eventHandled event', fakeAsync(()=>{
    service.dispatch(new GenericEventHandledEvent());
    flushMicrotasks();
    expect(stateContainer.getState().photoSavedEvent).toBeFalse();
  }))
});

import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { UserStateContainer } from 'src/core/containers/user/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { GetUserCommand } from 'src/infra/commands/user/GetUserCommand';
import { user1 } from 'src/infra/mocks/fake-data';
import { SaveUserCommand } from '../../commands/user/SaveUserCommand';
import { VerifyPasswordCommand } from '../../commands/user/VerifyPasswordCommand';
import { UserFakeRepository } from '../../mocks/UserFakeRepository';
import { UserDispatcherService } from './user-dispatcher.service';
import { UserSelectorService } from './user-selector.service';



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
  }))

  it('should dispatch saveUser command', fakeAsync(()=>{
    service.dispatch(new SaveUserCommand(user1.asDto()));
    user1.setIsAuth(true);
    flushMicrotasks();
    expect(stateContainer.getState().user).toEqual(user1);
    expect(stateContainer.getState().onException).toBeNull();
  }))

  it('should dispatch invalid register payload event when the registration policies are not followed', fakeAsync(()=>{
    service.dispatch(new SaveUserCommand({...user1.asDto(), password: "12345678"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException)
    .toEqual({message: "password must include at least 8 character and 1 special character 1 number and one uppercase"});
    service.dispatch(new SaveUserCommand({...user1.asDto(), email: "test125.gmail.com"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "invalid email..."});
  }))

  it('should dispatch verifyPassword command', fakeAsync(()=>{
    service.dispatch(new VerifyPasswordCommand({password: "Mot2$asse", email: ""}));
    flushMicrotasks();
    expect(stateContainer.getState().isAuth).toBeTrue();
  }));

  it('should dispatch WrongPassword event', fakeAsync(()=>{
    service.dispatch(new VerifyPasswordCommand({password: "Mot2$a$$e", email: ""}));
    flushMicrotasks();
    expect(stateContainer.getState().isAuth).toBeFalse();
    expect(stateContainer.getState().onException?.message).toBe('invalid credentials');
  }))
});

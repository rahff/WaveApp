import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { User } from 'src/core/entities/User';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { user1 } from 'src/infra/mocks/fake-data';
import { SaveUserCommand } from '../../commands/user/SaveUserCommand';
import { VerifyPasswordCommand } from '../../commands/user/VerifyPasswordCommand';
import { UserFakeRepository } from '../../mocks/UserFakeRepository';
import { UserDispatcherService } from './user-dispatcher.service';




describe('UserDispatcherService', () => {
  let service: UserDispatcherService;
  let stateContainer: UserStateContainer;
  const effectCreator: EffectCreator = new UserEffect(new UserFakeRepository());

  beforeEach(() => {
    stateContainer = new UserStateContainer(effectCreator);
    service = new UserDispatcherService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch saveUser command', fakeAsync(()=>{
    service.dispatch(new SaveUserCommand(user1));
    flushMicrotasks();
    expect(stateContainer.getState().user).toEqual(user1);
  }))

  it('should dispatch verifyPassword command', fakeAsync(()=>{
    service.dispatch(new VerifyPasswordCommand("Mot2$asse"));
    flushMicrotasks();
    expect(stateContainer.getState().isAuth).toBeTrue();
  }))
});

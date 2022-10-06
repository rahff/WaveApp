import { SetIsAuthCommand } from 'src/core/commands/user/SetIsAuthCommand';
import { SetUserCommand } from 'src/core/commands/user/UserCommand';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { User } from 'src/core/entities/User';
import { UserFakeRepository } from 'src/infra/mocks/UserFakeRepository';
import { UserSelectorService } from './user-selector.service';



describe('UserSelectorService', () => {
  let service: UserSelectorService;
  let stateContainer: UserStateContainer;
  beforeEach(() => {
    stateContainer = new UserStateContainer(new UserEffect(new UserFakeRepository()));
    service = new UserSelectorService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud be attached to the state container', ()=>{
    expect(stateContainer.getSelectors()).toContain(service)
  });

  it('should observe state of container', ()=> {
    service.getUser().subscribe((user: User | null)=> {
      expect(user).toEqual(stateContainer.getState().user);
    });
    service.getIsAuth().subscribe((isAuth: boolean)=> {
      expect(isAuth).toEqual(stateContainer.getState().isAuth);
    });
    service.getOnWrongPassword().subscribe((onWrong: boolean)=> {
      expect(onWrong).toEqual(stateContainer.getState().onWrongPassword);
    });
    service.getOnException().subscribe((exception: {message: string} | null)=> {
      expect(exception).toEqual(stateContainer.getState().onException);
    })
  })
  it('should update state following state container', ()=>{
    stateContainer.dispatch(new SetUserCommand({id: "", username: "Jean", email: "jeanvoltaire@gmail.com", password: "mot2passe"}));
    service.getUser().subscribe((user: User | null)=>{
      expect(user).toEqual({id: "", username: "Jean", email: "jeanvoltaire@gmail.com", password: "mot2passe"})
    });
    stateContainer.dispatch(new SetIsAuthCommand(true));
    service.getIsAuth().subscribe((isAuth: boolean)=>{
      expect(isAuth).toBeTrue();
    })
  })
});

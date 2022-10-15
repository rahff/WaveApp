import { SetIsAuthCommand } from 'src/core/commands/user/SetIsAuthCommand';
import { SetUserCommand } from 'src/core/commands/user/UserCommand';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { User } from 'src/core/entities/User';
import { UserFakeRepository } from 'src/infra/mocks/UserFakeRepository';
import { IUser } from 'src/infra/models/IUser';
import { UserSelectorService } from './user-selector.service';


const userRef = new User("Jean", "jeanvoltaire@gmail.com", "Mot2$asse", "123")


describe('UserSelectorService', () => {
  let service: UserSelectorService;
  let stateContainer: UserStateContainer;
  beforeEach(() => {
    service = new UserSelectorService();
    stateContainer = new UserStateContainer(new UserEffect(new UserFakeRepository()), service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud be attached to the state container', ()=>{
    expect(stateContainer.getSelector()).toEqual(service)
  });

  it('should observe state of container', ()=> {
    service.getUser().subscribe((user: IUser | null)=> {
      expect(user).toEqual(stateContainer.getState().user?.asDto() as IUser || null);
    });
    service.getIsAuth().subscribe((isAuth: boolean | undefined)=> {
      expect(isAuth).toEqual(stateContainer.getState().isAuth);
    });
    service.getException().subscribe((exception: {message: string} | null)=> {
      expect(exception).toEqual(stateContainer.getState().onException);
    })
  });

  it('should update state following state container', ()=>{
    stateContainer.dispatch(new SetUserCommand(userRef));
    service.getUser().subscribe((user: IUser | null)=>{
      expect(user).toEqual(userRef.asDto())
    });
    stateContainer.dispatch(new SetIsAuthCommand(true));
    service.getIsAuth().subscribe((isAuth: boolean | undefined)=>{
      expect(isAuth).toBeTrue();
    })
  })
});

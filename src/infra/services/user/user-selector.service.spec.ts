
import { SetIsAuthCommand } from '../../../core/commands/user/SetIsAuthCommand';
import { SetUserCommand } from '../../../core/commands/user/UserCommand';
import { UserStateContainer } from '../../../core/containers/user/UserStateContainer';
import { UserEffect } from '../../../core/effects/UserEffect';
import { User } from '../../../core/entities/User';
import { UserFakeRepository } from '../../mocks/UserFakeRepository';
import { IUser } from '../../models/IUser';
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

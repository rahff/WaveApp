import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { User } from 'src/core/entities/User';
import { UserState } from 'src/core/interfaces/states/UserState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class UserSelectorService extends StateSelector {

  protected override state$ = new BehaviorSubject<UserState>(this.stateContainer.getState() as UserState);

  constructor(stateContainer: UserStateContainer) {
    super(stateContainer)
    this.id = UserSelectorService.name;
  }

  public getUser(): Observable<User | null> {
    return this.state$.asObservable()
    .pipe(map((state: UserState) => state.user))
  }

  public getIsAuth(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: UserState) => state.isAuth))
  }

  public getOnWrongPassword(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: UserState) => state.onWrongPassword))
  }

  public getIsNewUser(): Observable<boolean | null> {
    return this.state$.asObservable()
    .pipe(map((state: UserState)=> state.isNewUser));
  }
 
}

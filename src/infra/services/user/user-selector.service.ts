import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from 'src/infra/models/IUser';
import { IUserState } from 'src/shared/abstract/IUserState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class UserSelectorService extends StateSelector {
  private initialState: IUserState = {onException: null, user: null, signupEvent: null, isAuth: false}
  override state$ = new BehaviorSubject<IUserState>(this.initialState);

  constructor() {
    super();
  }

  public getUser(): Observable<IUser | null> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState) => state.user))
  }

  public getIsAuth(): Observable<boolean | undefined> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState) => state.isAuth))
  }

  public getIsNewUser(): Observable<boolean | null> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState)=> state.signupEvent));
  }
 
}

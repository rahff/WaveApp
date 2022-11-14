import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUserState } from '../../../shared/abstract/IUserState';

import { StateSelector } from '../../../shared/abstract/StateSelector';
import { IUser } from '../../models/IUser';



@Injectable({
  providedIn: 'root'
})
export class UserSelectorService extends StateSelector {
  private initialState: IUserState = {onException: null, user: null, signupEvent: null, photoSavedEvent: false}
  override state$ = new BehaviorSubject<IUserState>(this.initialState);

  constructor() {
    super();
  }

  public getUser(): Observable<IUser | null> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState) => state.user ));
  }

  public getIsNewUser(): Observable<boolean | null> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState)=> state.signupEvent));
  }

  public getPhotoSavedEvent(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: IUserState)=> state.photoSavedEvent));
  }
 
}

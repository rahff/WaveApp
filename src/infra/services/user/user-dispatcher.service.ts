import { Injectable } from '@angular/core';
import { UserStateContainer } from '../../../core/containers/user/UserStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';
import { UserSelectorService } from './user-selector.service';



@Injectable({
  providedIn: 'root'
})
export class UserDispatcherService extends Dispatcher<UserSelectorService> {

  constructor(stateContainer: UserStateContainer) {
    super(stateContainer);
  }
}

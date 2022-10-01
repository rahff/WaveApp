import { Injectable } from '@angular/core';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { Dispatcher } from '../Dispatcher';




@Injectable({
  providedIn: 'root'
})
export class UserDispatcherService extends Dispatcher {

  constructor(stateContainer: UserStateContainer) {
    super(stateContainer)
  }
}

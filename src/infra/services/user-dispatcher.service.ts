import { Injectable } from '@angular/core';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { Command } from 'src/shared/command/Command';
import { Dispatcher } from '../interfaces/Dispatcher';

@Injectable({
  providedIn: 'root'
})
export class UserDispatcherService extends Dispatcher {

  constructor(stateContainer: UserStateContainer) {
    super(stateContainer)
  }
}

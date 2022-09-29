import { Injectable } from '@angular/core';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { Dispatcher } from 'src/infra/interfaces/Dispatcher';

@Injectable({
  providedIn: 'root'
})
export class ContactListDispatcherService extends Dispatcher {

  constructor(stateContainer: ContactListStateContainer) {
    super(stateContainer);
  }
}

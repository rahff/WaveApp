import { Injectable } from '@angular/core';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';
import { ContactListSelectorService } from './contact-list-selector.service';



@Injectable({
  providedIn: 'root'
})
export class ContactListDispatcherService extends Dispatcher<ContactListSelectorService> {

  constructor(stateContainer: ContactListStateContainer) {
    super(stateContainer);
  }
}

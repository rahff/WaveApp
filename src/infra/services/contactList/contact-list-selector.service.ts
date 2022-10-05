import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactItem } from 'src/core/entities/ContactItem';
import { ContactListState } from 'src/core/interfaces/states/ ContactListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';

@Injectable({
  providedIn: 'root'
})
export class ContactListSelectorService extends StateSelector{

  protected override state$ = new BehaviorSubject<ContactListState>(this.stateContainer.getState() as ContactListState);

  constructor(stateContainer: ContactListStateContainer) {
    super(stateContainer);
    this.id = ContactListSelectorService.name
  }

  public getContactList(): Observable<ContactItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: ContactListState) => state.contacts));
  }
}

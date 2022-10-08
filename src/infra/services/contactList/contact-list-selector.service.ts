import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ContactItem } from 'src/core/entities/ContactItem';
import { ContactListState } from 'src/core/interfaces/states/ ContactListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class ContactListSelectorService extends StateSelector{

  protected override state$ = new BehaviorSubject<ContactListState>({onException: null, contacts: []});

  constructor() {
    super();
  }

  public getContactList(): Observable<ContactItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: ContactListState) => state.contacts));
  }
}

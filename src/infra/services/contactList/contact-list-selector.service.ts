import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ContactListState } from 'src/core/interfaces/states/ ContactListState';
import { IContactItem } from 'src/infra/models/IContactIem';
import { IContactListState } from 'src/shared/abstract/IContactListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class ContactListSelectorService extends StateSelector{

  protected override state$ = new BehaviorSubject<IContactListState>({onException: null, contacts: []});

  constructor() {
    super();
  }

  public getContactList(): Observable<IContactItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: IContactListState) => state.contacts));
  }
}

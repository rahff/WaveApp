import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IContactListState } from '../../../shared/abstract/IContactListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';
import { IContactItem } from '../../models/IContactIem';



@Injectable({
  providedIn: 'root'
})
export class ContactListSelectorService extends StateSelector{

  protected override state$ = new BehaviorSubject<IContactListState>({onException: null, contacts: [], onSuccessSave: false});

  constructor() {
    super();
  }

  public getContactList(): Observable<IContactItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: IContactListState) => state.contacts));
  }

  public getSuccessSaveEvent(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: IContactListState)=> state.onSuccessSave));
  }

  public getContactItem(email: string | null): Observable<IContactItem> {
    return this.getContactList()
    .pipe(map((list: IContactItem[])=> this.getItemByEmail(list, email)),
    catchError(()=> {throw new Error("no contact exist with this email")}));
  }

  private getItemByEmail(list: IContactItem[], email: string | null): IContactItem {
    if(!email) return list[0];
    return list.filter((item: IContactItem) => item.email === email)[0];
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IMessageListState } from '../../../shared/abstract/IMessageListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';
import { IMessage } from '../../models/IMessage';


@Injectable({
  providedIn: 'root'
})
export class MessageListSelectorService extends StateSelector{

  protected override state$ = new BehaviorSubject<IMessageListState>({onException: null, inbox: [], outbox: [], messageSended: false});
  constructor() {
    super()
  }

  public getMessageList(): Observable<IMessage[]> {
    return this.state$.asObservable()
    .pipe(map((state: IMessageListState)=> {console.log("1",state);
     return state.inbox}));
  }

  public getSendedMessageEvent(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: IMessageListState)=>{ console.log("2",state); return state.messageSended}))
  }
}

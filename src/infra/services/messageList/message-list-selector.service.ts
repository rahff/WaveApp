import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IMessage } from 'src/infra/models/IMessage';
import { IMessageListState } from 'src/shared/abstract/IMessageListState';
import { StateSelector } from 'src/shared/abstract/StateSelector';

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
    .pipe(map((state: IMessageListState)=> {console.log("ererr",state.inbox);
     return state.inbox}));
  }

  public getSendedMessageEvent(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: IMessageListState)=> state.messageSended))
  }
}

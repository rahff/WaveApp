import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetNewMessagesCommand } from 'src/infra/commands/messageList/GetNewMessagesCommand';
import { MessageListFacade } from 'src/infra/services/messageList/MessageListFacade';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public messageList$: Observable<any> = new Observable();

  constructor(private messageListFacade: MessageListFacade) { }

  ngOnInit(): void {
    this.messageListFacade.dispatch(new GetNewMessagesCommand());
    this.messageList$ = this.messageListFacade.getMessageList();
  }

}

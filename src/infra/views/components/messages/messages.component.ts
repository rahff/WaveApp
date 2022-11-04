import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { GetMessageListCommand } from '../../../commands/messageList/GetMessageListCommand';
import { GetNewMessagesCommand } from '../../../commands/messageList/GetNewMessagesCommand';
import { MessageListFacade } from '../../../services/messageList/MessageListFacade';
import { AlertService } from '../../services/alert.service';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends SubscriberComponent implements OnInit {

  public messageList$: Observable<any> = new Observable();

  constructor(private messageListFacade: MessageListFacade) { super() }

  ngOnInit(): void {
    this.messageList$ = this.messageListFacade.getMessageList()
    this.messageListFacade.dispatch(new GetMessageListCommand());
    this.messageListFacade.dispatch(new GetNewMessagesCommand("myEmail@gmail.com"));
   
  }

}

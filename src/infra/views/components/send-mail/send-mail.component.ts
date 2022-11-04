import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MessageSendedEvent } from '../../../../core/events/messages/MessageSendedEvent';
import { GetContactListCommand } from '../../../commands/contactList/GetContactListCommand';
import { SaveOutBoxMessageCommand } from '../../../commands/messageList/SaveOutBoxMessageCommand';
import { IContactItem } from '../../../models/IContactIem';
import { IMessage } from '../../../models/IMessage';
import { ContactListFacade } from '../../../services/contactList/ContactListFacade';
import { MessageListFacade } from '../../../services/messageList/MessageListFacade';
import { AlertService } from '../../services/alert.service';
import { ValidatorsExtension } from '../../services/ValidatorsExtension';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent extends SubscriberComponent implements OnInit {

  private toReply: string | null = null;
  public messageForm: FormGroup = new FormGroup({});
  public contactList$: Observable<IContactItem[]> = new Observable();
  public contactReceiver: IContactItem | undefined = undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private contactListFacade: ContactListFacade,
              private messageListFacade: MessageListFacade,
              private router: Router,
              private alertService: AlertService) { super() }

  ngOnInit(): void {
    this.contactListFacade.dispatch(new GetContactListCommand());
    this.initForm();
    this.getContactReceiver();
    this.contactList$ = this.contactListFacade.getContactList();
    this.addMessageSendedEventListener();
  }

  private addMessageSendedEventListener(): void {
    this.subscription.add(this.messageListFacade.getMessageSendedEvent()
    .subscribe({next: this.messageSendedHandler.bind(this)}));
  }

  private messageSendedHandler(event: boolean): void {
    if(!event) return
      this.messageListFacade.dispatch(new MessageSendedEvent());
      this.alertService.successAlert("Sended")
      .then(()=> this.router.navigateByUrl('/dashboard/messages'));
  }

  private getContactReceiver(): void {
    this.subscription.add(this.contactListFacade.getContactItem(this.toReply)
    .subscribe({next: this.setContactReceiver.bind(this)}))
    
  }

  private setContactReceiver(contact: IContactItem): void {
    this.contactReceiver = contact;
  }

  private initForm(): void {
    this.toReply = this.activatedRoute.snapshot.queryParamMap.get('to');
    this.messageForm = this.fb.group({
      to: [this.toReply || "", [ValidatorsExtension.required, ValidatorsExtension.email]],
      message: ["", [ValidatorsExtension.required]],
      attachment: [""]
    })
  }

  public onSubmit(): void {
    if(this.messageForm.valid && this.contactReceiver){
      const outboxMessage: IMessage = {
        attachment: null,
        content: this.messageForm.get('message')?.value,
        to: this.contactReceiver,
        id: ""
      };
      this.messageListFacade.dispatch(new SaveOutBoxMessageCommand(outboxMessage));
    }
  }

  public setReceiver(value: string): void {
    this.toReply = value;
    this.getContactReceiver();
  }

}

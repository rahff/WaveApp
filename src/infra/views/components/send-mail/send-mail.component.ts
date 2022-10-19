import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { GetContactListCommand } from 'src/infra/commands/contactList/GetContactListCommand';
import { IContactItem } from 'src/infra/models/IContactIem';
import { ContactListFacade } from 'src/infra/services/contactList/ContactListFacade';
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
              private contactListFacade: ContactListFacade) { super() }

  ngOnInit(): void {
    this.contactListFacade.dispatch(new GetContactListCommand());
    this.initForm();
    this.getContactReceiver();
    this.contactList$ = this.contactListFacade.getContactList();
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
    if(this.messageForm.valid){
      
    }
  }

}

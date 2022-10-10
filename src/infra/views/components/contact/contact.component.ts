import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetContactListCommand } from 'src/infra/commands/contactList/GetContactListCommand';
import { IContactItem } from 'src/infra/models/IContactIem';
import { ContactListFacade } from 'src/infra/services/contactList/ContactListFacade';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends SubscriberComponent implements OnInit {

  public contactList$: Observable<IContactItem[]> = new Observable();

  constructor(private contactFacade: ContactListFacade) {
    super();
  }

  ngOnInit(): void {
    this.contactFacade.dispatch(new GetContactListCommand());
    this.contactList$ = this.contactFacade.getContactList();
  }

}

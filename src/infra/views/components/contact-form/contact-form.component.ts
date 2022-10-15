import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModifyContactItemCommand } from 'src/infra/commands/contactList/ModifyContactItemCommand';
import { SaveContactItemCommand } from 'src/infra/commands/contactList/SaveContactItemCommand';
import { ContactSavedEvent } from 'src/infra/events/ContactSavedEvent';
import { ExceptionHandledEvent } from 'src/infra/events/ExceptionHandledEvent';
import { IContactItem } from 'src/infra/models/IContactIem';
import { ContactListFacade } from 'src/infra/services/contactList/ContactListFacade';
import { AlertService } from '../../services/alert.service';
import { ValidatorsExtension } from '../../services/ValidatorsExtension';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent extends SubscriberComponent implements OnInit {

  public contactForm: FormGroup = new FormGroup({});
  public initialValue: IContactItem | undefined = undefined;

  constructor(private fb: FormBuilder,
              private contactListFacade: ContactListFacade,
              private alertService: AlertService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                super()
              }

  public ngOnInit(): void {
    this.getInitialValueForm();
    this.initForm(this.initialValue);
    this.addExceptionListener();
    this.addSuccessSaveEventListener();
  }

  private getInitialValueForm(): void {
    const contactId = this.activatedRoute.snapshot.queryParamMap.get('contactId');
    if(!contactId) return;
    this.subscription.add(this.contactListFacade.getContactList()
    .subscribe((list: IContactItem[])=> this.initialValue = list.filter((item:IContactItem)=> item.id === contactId)[0]))
  }

  private addSuccessSaveEventListener(): void {
    this.subscription.add(this.contactListFacade.getSuccessSaveEvent()
    .subscribe({next: this.saveEventHandler.bind(this)}));
  }

  private saveEventHandler(successEvent: boolean): void {
    if(!successEvent) return;
    this.contactListFacade.dispatch(new ContactSavedEvent());
    this.router.navigateByUrl('/dashboard/contact');
  }

  private addExceptionListener(): void {
    this.subscription.add(this.contactListFacade.getException()
    .subscribe({next: this.exceptionHandler.bind(this)}));
  }

  private exceptionHandler(exception: {message: string}|null): void {
    if(!exception) return
    this.contactListFacade.dispatch(new ExceptionHandledEvent())
    this.alertService.errorAlert(exception.message).finally();
  }

  
  private initForm(initialValue?: IContactItem): void {
    this.contactForm = this.fb.group({
      name: [initialValue?.name || '', [ValidatorsExtension.required, ValidatorsExtension.minLength(2), ValidatorsExtension.maxLength(28)]],
      firstname: [initialValue?.firstname || '', [ValidatorsExtension.maxLength(28)]],
      email: [initialValue?.email || '', [ValidatorsExtension.email, ValidatorsExtension.required]],
      tel: [initialValue?.tel || '', [ValidatorsExtension.maxLength(12)]]
    })
  }

  public onSubmit(): void {
    if(this.contactForm.valid){
      const contactItem: IContactItem = {
        name: this.contactForm.get('name')?.value,
        firstname: this.contactForm.get('firstname')?.value,
        email: this.contactForm.get('email')?.value,
        tel: this.contactForm.get('tel')?.value ? this.contactForm.get('tel')?.value : null,
        id: this.initialValue ? this.initialValue.id : ""
      }
      if(!this.initialValue){
        this.contactListFacade.dispatch(new SaveContactItemCommand(contactItem));
      }else {
        this.contactListFacade.dispatch(new ModifyContactItemCommand(contactItem))
      }
    }
  }

}

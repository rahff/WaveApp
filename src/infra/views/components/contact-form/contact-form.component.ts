import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';
import { Base64File } from '../../../../../shared/Base64File';
import { SaveContactInfoCommand } from '../../../commands/contactList/SaveContactInfoCommand';
import { ContactSavedEvent } from '../../../events/ContactSavedEvent';
import { ExceptionHandledEvent } from '../../../events/ExceptionHandledEvent';
import { GenericEventHandledEvent } from '../../../events/GenericEventHandledEvent';
import { ContactListFacade } from '../../../services/contactList/ContactListFacade';
import { AlertService } from '../../services/alert.service';
import { ValidatorsExtension } from '../../services/ValidatorsExtension';
import { SubscriberComponent } from '../../SubscriberComponent';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent extends SubscriberComponent implements OnInit {

  public focus1: boolean = false;
  public contactForm: FormGroup = new FormGroup({});
  public fileInputPlaceholder: string = "Put a contact-file from your new contact";
  public contactInfo: Base64File = {filename: "", data: ""};
  @ViewChild("fileInput") public fileInput: ElementRef<HTMLInputElement>;
  @ViewChild("filename") public filenameInput: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder,
              private contactListFacade: ContactListFacade,
              private alertService: AlertService,
              private router: Router) {
                super()
              }

  public ngOnInit(): void {
    this.initForm();
    this.addExceptionListener();
    this.addSuccessSaveEventListener();
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

  
  private initForm(): void {
    this.contactForm = this.fb.group({
      filename: ['', ValidatorsExtension.required]
    })
  }

  public browseFile(): void {
    this.fileInput.nativeElement.click();
  }

  public async setContactFile(): Promise<void> {
    const contactFile = this.fileInput.nativeElement.files[0];
    if(contactFile){
      this.fileInputPlaceholder = contactFile.name;
      this.contactInfo.filename = contactFile.name;
      this.contactInfo.data = await this.fileToBase64(contactFile);
      const userResponse = await this.confirmBeforeSaveImg()
      if(userResponse.isConfirmed) this.saveContactInfo();
      this.fileInput.nativeElement.blur();
    }else{
      this.fileInputPlaceholder = contactFile.name ?? "Put a contact-file from your new contact";
      this.fileInput.nativeElement.blur();
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private async confirmBeforeSaveImg(): Promise<SweetAlertResult<any>> {
    return await this.alertService.confirmImgAlert(`Add ${this.contactInfo.filename.split('.txt')[0]} in your contact ?`);
  }

  private saveContactInfo(): void {
    this.contactListFacade.dispatch(new SaveContactInfoCommand(this.contactInfo))
  }

}

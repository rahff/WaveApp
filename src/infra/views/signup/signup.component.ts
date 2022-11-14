import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';
import { Base64File } from '../../../../shared/Base64File';
import { SaveUserCommand } from '../../commands/user/SaveUserCommand';
import { SaveUserPhotoCommand } from '../../commands/user/SaveUserPhotoCommand';
import { ExceptionHandledEvent } from '../../events/ExceptionHandledEvent';
import { GenericEventHandledEvent } from '../../events/GenericEventHandledEvent';
import { IUser } from '../../models/IUser';
import { UserFacade } from '../../services/user/UserFacade';

import { AlertService } from '../services/alert.service';
import { SubscriberComponent } from '../SubscriberComponent';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends SubscriberComponent implements OnInit {

  public focus: boolean = false;
  public focus1: boolean = false;
  public focus2: boolean = false;
  public fileInputPlaceholder: string = 'Browse a file or take a photo for your avatar';
  private fileInputName: string = "user.png";
  public signupForm: FormGroup = new FormGroup({});
  public onVideo: boolean = false;
  public mediaStream: MediaStream | null = null;
  public userPhoto: Base64File = { filename: "user.png", data: ""};

  @ViewChild("fileInput") public fileInput: ElementRef<HTMLInputElement>;
  @ViewChild("avatarInput") public avatarInput: ElementRef<HTMLInputElement>;
  @ViewChild("canvas") public canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('video') public video: ElementRef<HTMLVideoElement>;

  constructor(private fb: FormBuilder,
              private userFacade: UserFacade,
              private router: Router,
              private alertService: AlertService) {
                super();
              }
  
  ngOnInit(): void {
    this.initForm();
    this.initListeners();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["",[Validators.required, Validators.email, Validators.minLength(5)]],
      avatar: [""],
    })
  }

  private initListeners(): void {
    this.addIsAuthListener();
    this.addOnExceptionListener();
    this.addPhotoSavedEventListener();
  }

  private addPhotoSavedEventListener(): void {
    this.subscription.add(this.userFacade.getPhotoSavedEvent()
    .subscribe({next: this.onPhotoSaveEvent.bind(this)}));
  }

  private onPhotoSaveEvent(event: boolean): void {
    if(event){ 
      this.alertService.successAlert("Photo saved sucessufilly");
      this.userFacade.dispatch(new GenericEventHandledEvent());
    }
  }

  private addIsAuthListener(): void {
    this.subscription.add(this.userFacade.getUser()
    .subscribe({next: this.authHandler.bind(this)}));
  }

  private authHandler(user: IUser | null): void {
    if(user) this.router.navigateByUrl('/dashboard');
  }

  private addOnExceptionListener(): void {
    this.subscription.add(this.userFacade.getException()
    .subscribe({next: this.onExcetionHandler.bind(this)}));
  }

  private onExcetionHandler(exception: {message: string} | null): void {
    if(!exception) return;
    this.userFacade.dispatch(new ExceptionHandledEvent());
    this.alertService.errorAlert(exception.message);
  }

  public async createPhotoCanvas(): Promise<void> {
    this.onVideo = true;
    
    const constraints: MediaStreamConstraints = { video: { width: 300, height: 150 }, audio: false };
    this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    this.video.nativeElement.srcObject = this.mediaStream;  
  }

  public browseFile(): void {
    this.fileInput.nativeElement.click();
  }

  public async setPhoto(): Promise<void> {
    const photoFile = this.fileInput.nativeElement.files[0];
    if(photoFile){
      const photoFileName = photoFile.name;
      this.fileInputPlaceholder = photoFileName;
      this.userPhoto.data = await this.fileToBase64(photoFile);
      const userResponse = await this.confirmBeforeSaveImg()
      if(userResponse.isConfirmed) this.savePhoto();
      this.avatarInput.nativeElement.blur();
    }else{
      this.fileInputPlaceholder = photoFile.name ?? 'Browse a file or take a photo for your avatar';
      this.avatarInput.nativeElement.blur();
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

  public async takePhoto(): Promise<void> {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    ctx.drawImage(this.video.nativeElement, 0, 0);
    this.userPhoto.data = this.canvas.nativeElement.toDataURL();
    const confirm = await this.confirmBeforeSaveImg();
      if(confirm.isConfirmed) this.savePhoto();
      else this.stopMediaStream();
      this.onVideo = false;
  }

  private savePhoto(): void {
    this.userFacade.dispatch(new SaveUserPhotoCommand(this.userPhoto));
    if(this.onVideo){
      this.stopMediaStream();
      this.onVideo = false;
    }
  }

  public stopMediaStream(): void {
    this.mediaStream.getTracks()
    .forEach((track: MediaStreamTrack) => track.stop());
    this.onVideo = false;
  }

  private async confirmBeforeSaveImg(): Promise<SweetAlertResult<any>> {
    return await this.alertService.confirmImgAlert("Save this picture ?", this.userPhoto.data);
  }

  public onSubmit(): void {
    if(this.signupForm.valid) { 
      const userInfo = this.signupForm.getRawValue();
      this.userFacade.dispatch(new SaveUserCommand(userInfo));
    }
  }
}

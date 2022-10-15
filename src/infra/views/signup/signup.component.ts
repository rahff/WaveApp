import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUserCommand } from 'src/infra/commands/user/SaveUserCommand';
import { ExceptionHandledEvent } from 'src/infra/events/ExceptionHandledEvent';
import { IUser } from 'src/infra/models/IUser';
import { UserFacade } from 'src/infra/services/user/UserFacade';
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
  public signupForm: FormGroup = new FormGroup({});

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
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
    })
  }

  private initListeners(): void {
    this.addIsAuthListener();
    this.addOnExceptionListener();
  }

  private addIsAuthListener(): void {
    this.subscription.add(this.userFacade.getUser()
    .subscribe({next: this.authHandler.bind(this)}));
  }

  private authHandler(user: IUser | null): void {
    if(user && user.isAuth) this.router.navigateByUrl('/dashboard');
  }

  private addOnExceptionListener(): void {
    this.subscription.add(this.userFacade.getException()
    .subscribe({next: this.onExcetionHandler.bind(this)}));
  }

  private onExcetionHandler(exception: {message: string} | null): void {
    if(!exception) return;
    this.userFacade.dispatch(new ExceptionHandledEvent());
    this.alertService.errorAlert(exception.message).finally();
  }

  public onSubmit(): void {
    if(this.signupForm.valid) { 
      console.log(this.signupForm);
      
      const userInfo = this.signupForm.getRawValue();
      this.userFacade.dispatch(new SaveUserCommand(userInfo));
    }
  }
}

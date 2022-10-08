import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUserCommand } from 'src/infra/commands/user/SaveUserCommand';
import { ExceptionThrowedEvent } from 'src/infra/events/ExceptionThrowedEvent';
import { UserFacade } from 'src/infra/services/user/UserFacade';
import { AlertService } from '../services/alert.service';
import { SubscriberComponent } from '../SubscriberComponent';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends SubscriberComponent implements OnInit {

  public chide: boolean = true;
  public hide: boolean = true;
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
    this.subscription.add(this.userFacade.getIsAuth().subscribe((isAuth: boolean)=>{
      if(isAuth) this.router.navigateByUrl('/dashboard');
    }))
  }

  private addOnExceptionListener(): void {
    this.subscription.add(this.userFacade.getException().subscribe((exception: {message: string} | null)=> {
      if(!exception) return;
      else this.onExcetionHandler(exception);
    }));
  }

  private onExcetionHandler(exception: {message: string}): void {
    this.userFacade.dispatch(new ExceptionThrowedEvent());
    this.alertService.errorAlert(exception.message).finally();
  }

  public onSubmit(): void {
    const userInfo = this.signupForm.getRawValue();
    this.userFacade.dispatch(new SaveUserCommand(userInfo));
  }

}

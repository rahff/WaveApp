import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCommand } from 'src/infra/commands/user/LoginCommand';
import { ExceptionHandledEvent } from 'src/infra/events/ExceptionHandledEvent';
import { UserFacade } from 'src/infra/services/user/UserFacade';
import { AlertService } from '../services/alert.service';
import { SubscriberComponent } from '../SubscriberComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SubscriberComponent implements OnInit {

  public focus: boolean = false;
  public focus1: boolean = false;
  public loading: boolean = false;
  public loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private userFacade: UserFacade,
              private router: Router,
              private alertService: AlertService) {
                super();
              }

  public ngOnInit(): void {
    this.initForm();
    this.addExceptionListener();
    this.addIsAuthListener();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  private addExceptionListener(): void {
    this.subscription.add(this.userFacade.getException()
    .subscribe({next: this.onExceptionhandler.bind(this)}));
  }

  private onExceptionhandler(exception: {message: string} | null): void {
    if(!exception) return;
    this.alertService.errorAlert(exception.message)
    .then(()=> this.userFacade.dispatch(new ExceptionHandledEvent()));
  }

  private addIsAuthListener(): void {
    this.subscription.add(this.userFacade.getIsAuth()
    .subscribe({next: this.onIsAuthHandler.bind(this)}));
  }

  private onIsAuthHandler(isAuth: boolean | undefined): void {
    if(isAuth) this.router.navigateByUrl('/dashboard');
  }

  public onSubmit(): void {
    if(this.loginForm.valid){
      const credentials = this.loginForm.getRawValue();
      this.userFacade.dispatch(new LoginCommand(credentials));
    }
  }
}

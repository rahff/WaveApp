import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SaveUserCommand } from 'src/infra/commands/user/SaveUserCommand';
import { ExceptionThrowedEvent } from 'src/infra/events/ExceptionThrowedEvent';
import { UserDispatcherService } from 'src/infra/services/user/user-dispatcher.service';
import { UserSelectorService } from 'src/infra/services/user/user-selector.service';
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
              private userDispatcher: UserDispatcherService,
              private userSelector: UserSelectorService,
              private router: Router,
              private alertService: AlertService) {
                super();
              }

  ngOnInit(): void {
    this.userSelector.getIsAuth().subscribe((isAuth: boolean)=>{
      if(isAuth) this.router.navigateByUrl('/dashboard');
    })
    this.userSelector.getOnException().subscribe((exception: {message: string} | null)=> {
      if(!exception) return;
      else {
        this.userDispatcher.dispatch(new ExceptionThrowedEvent());
        this.alertService.errorAlert(exception.message).finally();
      };
    });
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["",[Validators.required, Validators.email, Validators.minLength(5)]],
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
    })
  }

  public onSubmit(): void {
    const userInfo = this.signupForm.getRawValue()
    this.userDispatcher.dispatch(new SaveUserCommand(userInfo));
  }

}

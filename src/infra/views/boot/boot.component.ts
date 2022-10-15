import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetUserCommand } from 'src/infra/commands/user/GetUserCommand';
import { UserDispatcherService } from 'src/infra/services/user/user-dispatcher.service';
import { UserSelectorService } from 'src/infra/services/user/user-selector.service';
import { UserFacade } from 'src/infra/services/user/UserFacade';
import { SubscriberComponent } from '../SubscriberComponent';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.css']
})
export class BootComponent extends SubscriberComponent implements OnInit {

  constructor(private userFacade: UserFacade,
              private router: Router){
                super();
              }

  ngOnInit(): void {
    this.userFacade.dispatch(new GetUserCommand());
    this.subscription.add(this.userFacade.getIsNewUser()
    .subscribe((value: boolean | null)=> {
      if(value === null) return;
      else if(value === true) this.routeTo("/signup");
      else if(value === false) this.routeTo("/login");
    }))
  }

  private routeTo(path: string): void {
    setTimeout(() => {
      this.router.navigateByUrl(path)
    }, 1000);
  }
}

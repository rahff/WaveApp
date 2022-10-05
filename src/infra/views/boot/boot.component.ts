import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetUserCommand } from 'src/infra/commands/user/GetUserCommand';
import { UserDispatcherService } from 'src/infra/services/user/user-dispatcher.service';
import { UserSelectorService } from 'src/infra/services/user/user-selector.service';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.css']
})
export class BootComponent implements OnInit{

  constructor(private userDispatcher: UserDispatcherService,
              private userSelector: UserSelectorService,
              private router: Router){}

  ngOnInit(): void {
    this.userDispatcher.dispatch(new GetUserCommand());
    this.userSelector.getIsNewUser().subscribe((value: boolean | null)=> {
      if(value === null) return;
      else if(value === true) this.routeTo("/signup");
      else if(value === false) this.routeTo("/login");
    })
  }

  private routeTo(path: string): void {
    setTimeout(() => {
      this.router.navigateByUrl(path)
    }, 500);
  }
 
}

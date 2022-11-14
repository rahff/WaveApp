import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetUserCommand } from '../../../commands/user/GetUserCommand';
import { IUser } from '../../../models/IUser';
import { UserFacade } from '../../../services/user/UserFacade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed: boolean = false;
  public showOptionMenu: boolean = false;
  public username$: Observable<string>;

  constructor(private userFacade: UserFacade) { }

  ngOnInit(): void {
    this.userFacade.dispatch(new GetUserCommand());
    this.username$ = this.userFacade.getUser().pipe(map((user: IUser)=> {
      if(user) return user.username;
    }))
  }

  public toggleOptionMenu(): void {
    setTimeout(() => {
      this.showOptionMenu = !this.showOptionMenu;
    }, 50);
  }
}

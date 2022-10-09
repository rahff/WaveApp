import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public mobileMenuSidebarOpen(event: MouseEvent, param: string): void {

  }

  public callSidemenuCollapse(): void {

  }

  public logout(): void {

  }

  public toggleRightSidebar(): void {
    
  }

}

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardModule } from 'src/infra/modules/dashboard.module';
import { HeaderComponent } from '../components/header/header.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ["navigateByUrl"])
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: Router, useValue: routerSpy
        }
    ],
      declarations: [ DashboardComponent, HeaderComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

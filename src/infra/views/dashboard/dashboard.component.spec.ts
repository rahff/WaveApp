import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoreModule } from '../../modules/core.module';
import { HeaderComponent } from '../components/header/header.component';


import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerSpy: any;
  let fileSystemBridgeSpy: any;
  beforeEach(async () => {
    fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridge', ["dispatch"])
    routerSpy = jasmine.createSpyObj('Router', ["navigateByUrl"])
    await TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
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

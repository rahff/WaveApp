import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardModule } from '../../../modules/dashboard.module';


import { SendMailComponent } from './send-mail.component';

describe('SendMailComponent', () => {
  let component: SendMailComponent;
  let fixture: ComponentFixture<SendMailComponent>;
  let routerSpy: any;
  let fileSystemBridgeSpy: any;
  beforeEach(async () => {
    fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridge', ["dispatch"]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DashboardModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: { get: ()=> ""}}}
        },
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
        }
      ],
      declarations: [ SendMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

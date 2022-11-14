import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardModule } from '../../../modules/dashboard.module';


import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let routerSpy: any;
  let fileSystemBridgeSpy: any;
  beforeEach(async () => {
    fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridge', ["dispatch"]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DashboardModule, RouterTestingModule],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: ActivatedRoute, useValue: {snapshot: {url: [], queryParamMap: {get: ()=> ""}}}
        },
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
        }
      ],
      declarations: [ ContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

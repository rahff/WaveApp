import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardModule } from '../../../modules/dashboard.module';


import { CalendarEventFormComponent } from './calendar-event-form.component';

describe('CalendarEventFormComponent', () => {
  let component: CalendarEventFormComponent;
  let fixture: ComponentFixture<CalendarEventFormComponent>;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ["navigateByUrl"])
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DashboardModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: {get: (arg: string)=> ""}}}
        },
        {
          provide: Router, useValue: routerSpy
        }
      ],
      declarations: [ CalendarEventFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

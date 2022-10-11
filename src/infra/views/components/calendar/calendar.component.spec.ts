import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { fakeCalendarEvent1, fakeCalendarEvent2 } from 'src/infra/mocks/fake-data';
import { ICalendarEvent } from 'src/infra/models/ICalendarEvent';
import { CalendarModule } from 'src/infra/modules/calendar.module';
import { DashboardModule } from 'src/infra/modules/dashboard.module';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { CalendarFacade } from 'src/infra/services/calendar/CalendarFacade';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarFacadeSpy: any;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ["navigateByUrl"])
    calendarFacadeSpy = jasmine.createSpyObj('CalendarFacade', ["dispatch", "getCalendarEvent"])
    await TestBed.configureTestingModule({
      imports: [
        CalendarModule,
        DatabaseModule,
        DashboardModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CalendarFacade, useValue: calendarFacadeSpy
        }
      ],
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    calendarFacadeSpy.getCalendarEvent.and.returnValue(of([fakeCalendarEvent1.asDto(), fakeCalendarEvent2.asDto()]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive calendar events', ()=>{
    component.ngOnInit();
    expect(component.calendarOptions.events).toEqual([fakeCalendarEvent1.asDto(), fakeCalendarEvent2.asDto()])
  })
});

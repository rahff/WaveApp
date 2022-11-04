import { NgModule } from '@angular/core';
import { CalendarStateContainer } from '../../core/containers/calendar/CalendarStateContainer';
import { CalendarEffect } from '../../core/effects/CalendarEffect';
import { CalendarRepository } from '../../core/ports/driven/CalendarRepository';
import { StateSelector } from '../../shared/abstract/StateSelector';
import { CalendarRepositoryAdapter } from '../adapters/CalendarRepositoryAdapter';
import { CalendarSelectorService } from '../services/calendar/calendar-selector.service';




@NgModule({
  providers: [
    {
      provide: CalendarEffect, useFactory: (r: CalendarRepository) => new CalendarEffect(r),
      deps: [CalendarRepositoryAdapter]
    },
    {
      provide: CalendarStateContainer, useFactory: (e: CalendarEffect, s: StateSelector) => new CalendarStateContainer(e, s),
      deps: [CalendarEffect, CalendarSelectorService]
    }
  ]
})
export class CalendarModule { }

import { NgModule } from '@angular/core';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { CalendarEffect } from 'src/core/effects/CalendarEffect';
import { CalendarRepository } from 'src/core/ports/driven/CalendarRepository';
import { CalendarRepositoryAdapter } from '../adapters/CalendarRepositoryAdapter';
import { StateSelector } from 'src/shared/abstract/StateSelector';
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

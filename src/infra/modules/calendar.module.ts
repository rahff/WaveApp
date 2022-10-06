import { NgModule } from '@angular/core';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { CalendarEffect } from 'src/core/effects/CalendarEffect';
import { CalendarRepository } from 'src/core/ports/driven/CalendarRepository';
import { CalendarRepositoryAdapter } from '../adapters/CalendarRepositoryAdapter';



@NgModule({
  providers: [
    {
      provide: CalendarEffect, useFactory: (r: CalendarRepository) => new CalendarEffect(r),
      deps: [CalendarRepositoryAdapter]
    },
    {
      provide: CalendarStateContainer, useFactory: (e: EffectCreator) => new CalendarStateContainer(e),
      deps: [CalendarEffect]
    }
  ]
})
export class CalendarModule { }

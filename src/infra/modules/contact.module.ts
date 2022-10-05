import { NgModule } from '@angular/core';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { ContactListRepository } from 'src/core/ports/driven/ContactListRepository';
import { ContactListRepositoryAdapter } from '../adapters/ContactListRepositoryAdapter';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: ContactListEffect, useFactory: (r: ContactListRepository) => new ContactListEffect(r),
      deps: [ContactListRepositoryAdapter]
    },
    {
      provide: ContactListStateContainer, useFactory: (e: EffectCreator) => new ContactListStateContainer(e),
      deps: [ContactListEffect]
    }
  ]
})
export class ContactModule { }

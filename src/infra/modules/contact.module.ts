import { NgModule } from '@angular/core';
import { ContactListStateContainer } from 'src/core/containers/ContactListStateContainer';
import { ContactListEffect } from 'src/core/effects/ContactListEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { ContactListRepository } from 'src/core/ports/driven/ContactListRepository';
import { StateSelector } from 'src/shared/abstract/StateSelector';
import { ContactListRepositoryAdapter } from '../adapters/ContactListRepositoryAdapter';
import { ContactListSelectorService } from '../services/contactList/contact-list-selector.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: ContactListEffect, useFactory: (r: ContactListRepository) => new ContactListEffect(r),
      deps: [ContactListRepositoryAdapter]
    },
    {
      provide: ContactListStateContainer, useFactory: (e: EffectCreator, s: StateSelector) => new ContactListStateContainer(e, s),
      deps: [ContactListEffect, ContactListSelectorService]
    }
  ]
})
export class ContactModule { }

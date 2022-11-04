import { NgModule } from '@angular/core';
import { ContactListStateContainer } from '../../core/containers/contactList/ContactListStateContainer';
import { ContactListEffect } from '../../core/effects/ContactListEffect';
import { ContactListRepository } from '../../core/ports/driven/ContactListRepository';
import { StateSelector } from '../../shared/abstract/StateSelector';
import { ContactListRepositoryAdapter } from '../adapters/ContactListRepositoryAdapter';
import { ContactListSelectorService } from '../services/contactList/contact-list-selector.service';



@NgModule({
  providers: [
    {
      provide: ContactListEffect, useFactory: (r: ContactListRepository) => new ContactListEffect(r),
      deps: [ContactListRepositoryAdapter]
    },
    {
      provide: ContactListStateContainer, useFactory: (e: ContactListEffect, s: StateSelector) => new ContactListStateContainer(e, s),
      deps: [ContactListEffect, ContactListSelectorService]
    }
  ]
})
export class ContactModule { }

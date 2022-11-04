
import { NgModule } from '@angular/core';
import { UserStateContainer } from '../../core/containers/user/UserStateContainer';
import { UserEffect } from '../../core/effects/UserEffect';
import { UserRepository } from '../../core/ports/driven/UserRepository';
import { StateSelector } from '../../shared/abstract/StateSelector';
import { UserRepositoryAdapter } from '../adapters/UserRepositoryAdapter';
import { UserSelectorService } from '../services/user/user-selector.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: UserEffect, useFactory: (r: UserRepository) => new UserEffect(r),
      deps: [UserRepositoryAdapter]
    },
    {
      provide: UserStateContainer, useFactory: (e: UserEffect, s: StateSelector)=> new UserStateContainer(e, s),
      deps: [UserEffect, UserSelectorService]
    }
  ]
})
export class UserModule { }

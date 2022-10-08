import { NgModule } from '@angular/core';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { StateSelector } from 'src/shared/abstract/StateSelector';
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
      provide: UserStateContainer, useFactory: (e: EffectCreator, s: StateSelector)=> new UserStateContainer(e, s),
      deps: [UserEffect, UserSelectorService]
    }
  ]
})
export class UserModule { }

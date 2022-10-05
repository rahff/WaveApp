import { NgModule } from '@angular/core';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { UserRepositoryAdapter } from '../adapters/UserRepositoryAdapter';




@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: UserEffect, useFactory: (r: UserRepository) => new UserEffect(r),
      deps: [UserRepositoryAdapter]
    },
    {
      provide: UserStateContainer, useFactory: (e: EffectCreator)=> new UserStateContainer(e),
      deps: [UserEffect]
    }
  ]
})
export class UserModule { }

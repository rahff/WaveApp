import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserStateContainer } from 'src/core/containers/user/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { EffectCreator } from 'src/core/ports/driver/EffectCreator';
import { UserRepositoryAdapter } from 'src/infra/adapters/UserRepositoryAdapter';
import { AppModule } from 'src/infra/modules/app.module';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserModule } from 'src/infra/modules/user.module';
import { UserSelectorService } from 'src/infra/services/user/user-selector.service';
import { StateSelector } from 'src/shared/abstract/StateSelector';
import { BootComponent } from './boot.component';



describe('BootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UserModule,
        DatabaseModule,
        AppModule
      ],
      providers: [
        {
          provide: UserEffect, useFactory: (r: UserRepository) => new UserEffect(r),
          deps: [UserRepositoryAdapter]
        },
        {
          provide: UserStateContainer, useFactory: (e: EffectCreator, s: StateSelector)=> new UserStateContainer(e, s),
          deps: [UserEffect, UserSelectorService]
        }
      ],
      declarations: [
        BootComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BootComponent);
    const boot = fixture.componentInstance;
    expect(boot).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { UserRepositoryAdapter } from 'src/infra/adapters/UserRepositoryAdapter';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserModule } from 'src/infra/modules/user.module';
import { BootComponent } from './boot.component';

describe('BootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UserModule,
        DatabaseModule
      ],
      providers: [
        {
          provide: UserEffect, useFactory: (r: UserRepository) => new UserEffect(r),
          deps: [UserRepositoryAdapter]
        },
        {
          provide: UserStateContainer, useFactory: (e: EffectCreator)=> new UserStateContainer(e),
          deps: [UserEffect]
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

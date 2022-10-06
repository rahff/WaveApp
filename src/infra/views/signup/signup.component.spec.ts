import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { UserRepositoryAdapter } from 'src/infra/adapters/UserRepositoryAdapter';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserModule } from 'src/infra/modules/user.module';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
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
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

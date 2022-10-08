import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateContainer } from 'src/core/containers/UserStateContainer';
import { UserEffect } from 'src/core/effects/UserEffect';
import { UserRepository } from 'src/core/ports/driven/UserRepository';
import { EffectCreator } from 'src/core/ports/driver/EffectCreator';
import { UserRepositoryAdapter } from 'src/infra/adapters/UserRepositoryAdapter';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserSelectorService } from 'src/infra/services/user/user-selector.service';
import { StateSelector } from 'src/shared/abstract/StateSelector';
import { SignupComponent } from './signup.component';



describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"])
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatabaseModule
      ],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: UserEffect, useFactory: (r: UserRepository) => new UserEffect(r),
          deps: [UserRepositoryAdapter]
        },
        {
          provide: UserStateContainer, useFactory: (e: EffectCreator,s: StateSelector)=> new UserStateContainer(e, s),
          deps: [UserEffect, UserSelectorService]
        }
      ],
      declarations: [ SignupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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

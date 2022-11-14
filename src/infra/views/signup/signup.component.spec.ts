import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateContainer } from '../../../core/containers/user/UserStateContainer';
import { UserEffect } from '../../../core/effects/UserEffect';
import { UserRepository } from '../../../core/ports/driven/UserRepository';
import { EffectCreator } from '../../../core/ports/driver/EffectCreator';
import { StateSelector } from '../../../shared/abstract/StateSelector';
import { UserRepositoryAdapter } from '../../adapters/UserRepositoryAdapter';
import { AppModule } from '../../modules/app.module';
import { DatabaseModule } from '../../modules/database.module';
import { UserModule } from '../../modules/user.module';
import { UserSelectorService } from '../../services/user/user-selector.service';

import { SignupComponent } from './signup.component';



describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy: any;
  let fileSystemBridgeSpy: any
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridgeSpy', ["saveFile"]);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatabaseModule,
        UserModule,
        AppModule
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
        },
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
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

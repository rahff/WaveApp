import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

import { BootComponent } from './boot.component';



describe('BootComponent', () => {
  let fileSystemBridgeSpy: any;

  beforeEach(async () => {
    fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridgeSpy', ["saveFile"]);
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
        },
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
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

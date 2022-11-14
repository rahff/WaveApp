import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '../../../modules/core.module';
import { DashboardModule } from '../../../modules/dashboard.module';
import { ElectronModule } from '../../../modules/electron.module';



import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fileSystemBridgeSpy: any;
  beforeEach(async () => {
    fileSystemBridgeSpy = jasmine.createSpyObj("FileSystemBridge", ["dispatch"])
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        CoreModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

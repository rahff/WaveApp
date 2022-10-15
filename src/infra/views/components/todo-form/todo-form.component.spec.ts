import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardModule } from 'src/infra/modules/dashboard.module';
import { TodoFormComponent } from './todo-form.component';



describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DashboardModule],
      declarations: [ TodoFormComponent ],
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: ActivatedRoute, useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

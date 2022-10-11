import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { item1, item2 } from 'src/infra/mocks/fake-data';
import { ITodoItem } from 'src/infra/models/ITodoItem';
import { DashboardModule } from 'src/infra/modules/dashboard.module';
import { TodoListFacade } from 'src/infra/services/todoList/TodoListFacade';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoFacadeSpy: any;
  beforeEach(async () => {
    todoFacadeSpy = jasmine.createSpyObj('TodoListFacade', ["dispatch", "getTodoList"])
    await TestBed.configureTestingModule({
      imports: [DashboardModule],
      providers: [
        {
          provide: TodoListFacade, useValue: todoFacadeSpy
        }
      ],
      declarations: [ TodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoFacadeSpy.getTodoList.and.returnValue(of([item1.asDto(), item2.asDto()]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receives todo item list', ()=>{
    component.ngOnInit();
    component.todoList$.subscribe((list: ITodoItem[])=> {
      expect(list).toEqual([item1.asDto(), item2.asDto()]);
    })
  })
});

import { TestBed } from '@angular/core/testing';
import { TodoListSelectorService } from './todo-list-selector.service';




describe('TodoListSelectorService', () => {
  let service: TodoListSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

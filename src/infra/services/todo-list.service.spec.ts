import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { SaveTodoListItemCommand } from '../commands/SaveTodoListItem';
import { TodoListFakeRepository } from '../mocks/TodoListFakeRepository';
import { TodoListService } from './todo-list.service';



describe('TodoListService', () => {
  let service: TodoListService;
  let stateContainer: TodoListStateContainer;
  let effect: TodoListEffect;
  beforeEach(() => {
    effect = new TodoListEffect(new TodoListFakeRepository())
    stateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()));
    service = new TodoListService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save an item in todo list', fakeAsync(()=>{
    service.dispatch(new SaveTodoListItemCommand({description: "test"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[0]?.description).toBe("test");
  }))
});

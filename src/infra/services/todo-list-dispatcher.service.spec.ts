import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetTodoListItemsCommand } from 'src/core/commands/SetTodoListItemsCommand';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { TodoItem } from 'src/core/entities/TodoItem';
import { DeleteTodoListItemCommand } from '../commands/DeleteTodoListItemCommand';
import { GetTodoListItemsCommand } from '../commands/GetTodoListItemsCommand';
import { ModifyDescriptionTodoItemCommand } from '../commands/ModifyDescriptionTodoItemCommand';
import { SaveTodoListItemCommand } from '../commands/SaveTodoListItem';
import { TodoListFakeRepository } from '../mocks/TodoListFakeRepository';
import { TodoListDispatcherService } from './todo-list-dispatcher.service';



describe('TodoListDispatcherService', () => {
  let service: TodoListDispatcherService;
  let stateContainer: TodoListStateContainer;
  let effect: TodoListEffect;

  beforeEach(() => {
    effect = new TodoListEffect(new TodoListFakeRepository())
    stateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()));
    service = new TodoListDispatcherService(stateContainer);
  });
  
  beforeEach(()=>{
    stateContainer.dispatch(new SetTodoListItemsCommand([new TodoItem("123", "test1"), new TodoItem("456", "test2")]));
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todolist items', fakeAsync(()=> {
    stateContainer.dispatch(new SetTodoListItemsCommand([]));
    service.dispatch(new GetTodoListItemsCommand(null));
    flushMicrotasks();
    expect(stateContainer.getState().items).toEqual([new TodoItem("123", "test1"), new TodoItem("456", "test2")])
  }))

  it('should save an item in todo list', fakeAsync(()=>{
    service.dispatch(new SaveTodoListItemCommand({description: "test"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[2]?.description).toBe("test");
  }))

  it('should remove an item in todo list', fakeAsync(()=>{
    service.dispatch(new DeleteTodoListItemCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().items.length).toBe(1);
    expect(stateContainer.getState().items[0].getId()).toBe("456");
  }))

  it('should update item description in todo list', fakeAsync(()=>{
    service.dispatch(new ModifyDescriptionTodoItemCommand({id: "456", update: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[1].description).toBe("brand new description")
  }))
});

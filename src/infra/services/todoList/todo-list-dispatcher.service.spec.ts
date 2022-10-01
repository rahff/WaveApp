import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetTodoListItemsCommand } from 'src/core/commands/todoList/SetTodoListItemsCommand';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { item1, item2 } from 'src/infra/mocks/fake-data';
import { DeleteTodoListItemCommand } from '../../commands/todoList/DeleteTodoListItemCommand';
import { GetTodoListItemsCommand } from '../../commands/todoList/GetTodoListItemsCommand';
import { ModifyTodoItemCommand } from '../../commands/todoList/ModifyTodoItemCommand';
import { SaveTodoListItemCommand } from '../../commands/todoList/SaveTodoListItem';
import { TodoListFakeRepository } from '../../mocks/TodoListFakeRepository';
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
    stateContainer.dispatch(new SetTodoListItemsCommand([item1, item2]));
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getTodoList command', fakeAsync(()=> {
    stateContainer.dispatch(new SetTodoListItemsCommand([]));
    service.dispatch(new GetTodoListItemsCommand(null));
    flushMicrotasks();
    expect(stateContainer.getState().items).toEqual([item1, item2])
  }))

  it('should dispatch saveTodo command', fakeAsync(()=>{
    service.dispatch(new SaveTodoListItemCommand({...item2, id: "789", description: "new value"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[2]?.description).toBe("new value");
  }))

  it('should dispatch todo alredy exist event when the user try to save a todo with same existing description',fakeAsync(()=> {
    service.dispatch(new SaveTodoListItemCommand({...item2, id: "789", description: "test2"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this.todo already exist"});
  }));

  it('should dispatch remove todo command', fakeAsync(()=>{
    service.dispatch(new DeleteTodoListItemCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().items.length).toBe(1);
    expect(stateContainer.getState().items[0].id).toBe("456");
  }));

  it('should dispatch noExistingTodo event when user tries delete an non existing todo', fakeAsync(()=>{
    service.dispatch(new DeleteTodoListItemCommand("987"));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this todo does not exist"})
  }))

  it('should dispatch modifyTodoItem command', fakeAsync(()=>{
    service.dispatch(new ModifyTodoItemCommand({id: "456", description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[1].description).toBe("brand new description")
  }))

  it('should dispatch canotModify event when modify item policies are not followed', fakeAsync(()=>{
    service.dispatch(new ModifyTodoItemCommand({id: "987", description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this todo does not exist"});
    service.dispatch(new ModifyTodoItemCommand({description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "cannot modify without identifier"});
  }))
});

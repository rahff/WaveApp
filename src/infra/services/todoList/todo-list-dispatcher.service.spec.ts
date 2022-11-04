import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetTodoListItemsCommand } from '../../../core/commands/todoList/SetTodoListItemsCommand';
import { TodoListStateContainer } from '../../../core/containers/todoList/TodoListStateContainer';
import { TodoListEffect } from '../../../core/effects/TodoListEffect';
import { DeleteTodoListItemCommand } from '../../commands/todoList/DeleteTodoListItemCommand';
import { GetTodoListItemsCommand } from '../../commands/todoList/GetTodoListItemsCommand';
import { ModifyTodoItemCommand } from '../../commands/todoList/ModifyTodoItemCommand';
import { SaveTodoListItemCommand } from '../../commands/todoList/SaveTodoListItem';
import { item1, item2 } from '../../mocks/fake-data';
import { TodoListFakeRepository } from '../../mocks/TodoListFakeRepository';
import { TodoListDispatcherService } from './todo-list-dispatcher.service';
import { TodoListSelectorService } from './todo-list-selector.service';



describe('TodoListDispatcherService', () => {
  let service: TodoListDispatcherService;
  let stateContainer: TodoListStateContainer;
  let effect: TodoListEffect;
  let stateSelector: TodoListSelectorService;
  beforeEach(() => {
    stateSelector = new TodoListSelectorService()
    effect = new TodoListEffect(new TodoListFakeRepository())
    stateContainer = new TodoListStateContainer(effect, stateSelector);
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
    service.dispatch(new GetTodoListItemsCommand());
    flushMicrotasks();
    expect(stateContainer.getState().items).toEqual([item1, item2])
  }))

  it('should dispatch saveTodo command', fakeAsync(()=>{
    service.dispatch(new SaveTodoListItemCommand({...item2.asDto(), id: "789", description: "new value"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[2]?.getDescription()).toBe("new value");
  }))

  it('should dispatch todo alredy exist event when the user try to save a todo with same existing description',fakeAsync(()=> {
    service.dispatch(new SaveTodoListItemCommand({...item2.asDto(), id: "789", description: "test2"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this.todo already exist"});
  }));

  it('should dispatch remove todo command', fakeAsync(()=>{
    service.dispatch(new DeleteTodoListItemCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().items.length).toBe(1);
    expect(stateContainer.getState().items[0].getId()).toBe("456");
  }));

  it('should dispatch noExistingTodo event when user tries delete an non existing todo', fakeAsync(()=>{
    service.dispatch(new DeleteTodoListItemCommand("987"));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this todo does not exist"})
  }))

  it('should dispatch modifyTodoItem command', fakeAsync(()=>{
    service.dispatch(new ModifyTodoItemCommand({...item2.asDto(), description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().items[1].getDescription()).toBe("brand new description")
  }))

  it('should dispatch canotModify event when modify item policies are not followed', fakeAsync(()=>{
    service.dispatch(new ModifyTodoItemCommand({...item1.asDto(), id: "987", description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "this todo does not exist"});
    service.dispatch(new ModifyTodoItemCommand({...item1.asDto(), id: "", description: "brand new description"}));
    flushMicrotasks();
    expect(stateContainer.getState().onException).toEqual({message: "cannot modify without identifier"});
  }))
});

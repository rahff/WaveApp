import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { TodoItem } from 'src/core/entities/TodoItem';
import { TodoListFakeRepository } from 'src/infra/mocks/TodoListFakeRepository';
import { TodoListSelectorService } from './todo-list-selector.service';




describe('TodoListSelectorService', () => {
  let service: TodoListSelectorService;
  let stateContainer: TodoListStateContainer;

  beforeEach(() => {
    service = new TodoListSelectorService();
    stateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()), service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe state of container', ()=>{
    service.getTodoList().subscribe((list: TodoItem[]) =>{
      expect(list).toEqual(stateContainer.getState().items);
    });
  })
});

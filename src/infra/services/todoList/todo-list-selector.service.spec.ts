
import { TodoListStateContainer } from '../../../core/containers/todoList/TodoListStateContainer';
import { TodoListEffect } from '../../../core/effects/TodoListEffect';
import { TodoListFakeRepository } from '../../mocks/TodoListFakeRepository';
import { ITodoItem } from '../../models/ITodoItem';
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
    service.getTodoList().subscribe((list: ITodoItem[]) =>{
      expect(list).toEqual( stateContainer.getState().items.map((item)=> item.asDto()));
    });
    service.getSuccessSaveEvent().subscribe((event: boolean) =>{
      expect(event).toEqual( stateContainer.getState().onSuccessSave);
    });
  })
});

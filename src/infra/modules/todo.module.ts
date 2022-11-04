import { NgModule } from '@angular/core';
import { TodoListStateContainer } from '../../core/containers/todoList/TodoListStateContainer';
import { TodoListEffect } from '../../core/effects/TodoListEffect';
import { TodoListRepository } from '../../core/ports/driven/TodoListRepository';
import { StateSelector } from '../../shared/abstract/StateSelector';
import { TodoListRepositoryAdapter } from '../adapters/TodoListRepositoryAdapter';
import { TodoListSelectorService } from '../services/todoList/todo-list-selector.service';



@NgModule({
  providers: [
    {
      provide: TodoListEffect, useFactory: (r: TodoListRepository) => new TodoListEffect(r),
      deps: [TodoListRepositoryAdapter]
    },
    {
      provide: TodoListStateContainer, useFactory: (e: TodoListEffect, s: StateSelector) => new TodoListStateContainer(e, s),
      deps: [TodoListEffect, TodoListSelectorService]
    }
  ]
})
export class TodoModule { }

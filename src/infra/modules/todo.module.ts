import { NgModule } from '@angular/core';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { TodoListRepository } from 'src/core/ports/driven/TodoListRepository';
import { StateSelector } from 'src/shared/abstract/StateSelector';
import { TodoListSelectorService } from '../services/todoList/todo-list-selector.service';



@NgModule({
  providers: [
    {
      provide: TodoListEffect, useFactory: (r: TodoListRepository) => new TodoListEffect(r)
    },
    {
      provide: TodoListStateContainer, useFactory: (e: EffectCreator, s: StateSelector) => new TodoListStateContainer(e, s),
      deps: [TodoListEffect, TodoListSelectorService]
    }
  ]
})
export class TodoModule { }

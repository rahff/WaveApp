import { NgModule } from '@angular/core';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { TodoListEffect } from 'src/core/effects/TodoListEffect';
import { EffectCreator } from 'src/core/interfaces/EffectCreator';
import { TodoListRepository } from 'src/core/ports/driven/TodoListRepository';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: TodoListEffect, useFactory: (r: TodoListRepository) => new TodoListEffect(r)
    },
    {
      provide: TodoListStateContainer, useFactory: (e: EffectCreator) => new TodoListStateContainer(e),
      deps: [TodoListEffect]
    }
  ]
})
export class TodoModule { }

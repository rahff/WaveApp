import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTodoListItemsCommand } from 'src/infra/commands/todoList/GetTodoListItemsCommand';
import { ITodoItem } from 'src/infra/models/ITodoItem';
import { TodoListFacade } from 'src/infra/services/todoList/TodoListFacade';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todoList$: Observable<ITodoItem[]> = new Observable();

  constructor(private todoFacade: TodoListFacade) { }

  ngOnInit(): void {
    this.todoFacade.dispatch(new GetTodoListItemsCommand());
    this.todoList$ = this.todoFacade.getTodoList()

  }

}

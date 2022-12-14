import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteTodoListItemCommand } from '../../../commands/todoList/DeleteTodoListItemCommand';
import { GetTodoListItemsCommand } from '../../../commands/todoList/GetTodoListItemsCommand';
import { ModifyTodoItemCommand } from '../../../commands/todoList/ModifyTodoItemCommand';
import { ITodoItem } from '../../../models/ITodoItem';
import { TodoListFacade } from '../../../services/todoList/TodoListFacade';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todoList$: Observable<ITodoItem[]> = new Observable();

  constructor(private todoFacade: TodoListFacade,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.todoFacade.dispatch(new GetTodoListItemsCommand());
    this.todoList$ = this.todoFacade.getTodoList();
  }

  public deleteTodo(todoId: string): void {
    this.alertService.confirmationAlert().then((_)=>{
      if(_.isConfirmed) this.todoFacade.dispatch(new DeleteTodoListItemCommand(todoId)); 
    })
  }

  public doneTodo(todo: ITodoItem): void {
    if(todo.status) return;
    this.alertService.confirmationAlert("Make sure that it's done","Yes, it is done").then((_)=>{
      if(_.isConfirmed) {
        todo.status = true;
        this.todoFacade.dispatch(new ModifyTodoItemCommand(todo));
      }
    })
  }

}

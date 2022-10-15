import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveTodoListItemCommand } from 'src/infra/commands/todoList/SaveTodoListItem';
import { ExceptionHandledEvent } from 'src/infra/events/ExceptionHandledEvent';
import { TodoItemSavedEvent } from 'src/infra/events/TodoItemSavedEvent';
import { ITodoItem } from 'src/infra/models/ITodoItem';
import { TodoListFacade } from 'src/infra/services/todoList/TodoListFacade';
import { AlertService } from '../../services/alert.service';
import { ValidatorsExtension } from '../../services/ValidatorsExtension';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent extends SubscriberComponent implements OnInit {

  public todoForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private todoListFacade: TodoListFacade,
              private alertService: AlertService,
              private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
    this.addExceptionListener();
    this.addSuccessSaveListener();
  }

  private addSuccessSaveListener(): void {
    this.subscription.add(this.todoListFacade.getSuccessSaveEvent()
    .subscribe({next: this.successSaveHandler.bind(this)}))
  }

  private successSaveHandler(successEvent: boolean): void {
    if(!successEvent) return;
      else {
        this.todoListFacade.dispatch(new TodoItemSavedEvent());
        this.router.navigateByUrl('/dashboard/todo-list')
      }
  }

  private addExceptionListener(): void {
    this.subscription.add(this.todoListFacade.getException()
    .subscribe({next: this.exceptionHandler.bind(this)}));
  }

  private exceptionHandler(exception: {message: string}|null): void {
    if(!exception) return;
    this.todoListFacade.dispatch(new ExceptionHandledEvent());
    this.alertService.errorAlert(exception.message).finally();
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      description: ['', [ValidatorsExtension.required, ValidatorsExtension.minLength(3)]]
    })
  }

  public onSubmit(): void {
    if(this.todoForm.valid){
      const todoItem: ITodoItem = { description: this.todoForm.get('description')?.value, status: false, id: ""};
      this.todoListFacade.dispatch(new SaveTodoListItemCommand(todoItem));
    }
  }

}

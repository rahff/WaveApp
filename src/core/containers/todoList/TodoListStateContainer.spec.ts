import { TodoItem } from "../../entities/TodoItem";
import { TodoListStateContainer } from "./TodoListStateContainer";
import { TodoListEffect } from "../../effects/TodoListEffect";
import { TodoListSelectorService } from "../../../infra/services/todoList/todo-list-selector.service";
import { TodoItemSavedEvent } from "../../../infra/events/TodoItemSavedEvent";
import { TodoListFakeRepository } from "../../../infra/mocks/TodoListFakeRepository";
import { AddTodoListItemCommand } from "../../commands/todoList/AddTodoListItemCommand";
import { DoneTodoListItemCommand } from "../../commands/todoList/DoneTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../../commands/todoList/UpdateTodoItemCommand";


const item1 = new TodoItem("test1", "123")
const item2 = new TodoItem("test2", "456")
const item3 = new TodoItem("test3", "789")


describe('TodoListStateContainer', ()=> {
    let todoListStateContainer: TodoListStateContainer;
    let stateSelector: TodoListSelectorService;
    beforeEach(()=> {
        stateSelector = new TodoListSelectorService();
        todoListStateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()), stateSelector);
        todoListStateContainer.dispatch(new SetTodoListItemsCommand([item1, item2]));
    })

    it('should have an initial state as empty list of item', ()=> {
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([item1, item2]);
    })

    it('should set items list into state', ()=> {
        todoListStateContainer.dispatch(new SetTodoListItemsCommand([item1, item2]));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([item1, item2]);
    })

    it('should add an item into the state list of item', ()=> {
        todoListStateContainer.dispatch(new AddTodoListItemCommand(item3));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([item1, item2, item3]);
        expect(state.onSuccessSave).toBeTrue();
    })

    it('should remove an item into the state list of item', ()=> {
        todoListStateContainer.dispatch(new RemoveTodoListItemCommand("123"));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([item2]);
    })

    it('should upadate status of an item into the state list', ()=> {
        todoListStateContainer.dispatch(new DoneTodoListItemCommand("456"));
        const state = todoListStateContainer.getState();
        expect(state.items[1].getStatus()).toBeTrue();
    })

    it('should update description of an item into the state list', ()=> {
        const updated = new TodoItem("new description", item2.getId());
        todoListStateContainer.dispatch(new UpdateTodoItemCommand(updated));
        const state = todoListStateContainer.getState();
        expect(state.items[1].getDescription()).toBe("new description");
    })

    it('should reset onSuccesssave in the state', ()=>{
        todoListStateContainer.dispatch(new AddTodoListItemCommand(item3));
        todoListStateContainer.dispatch(new TodoItemSavedEvent());
        expect(todoListStateContainer.getState().onSuccessSave).toBeFalse()
    })

})
import { TodoItem } from "../entities/TodoItem";
import { TodoListStateContainer } from "./TodoListStateContainer";
import { TodoListEffect } from "../effects/TodoListEffect";
import { TodoListFakeRepository } from "src/infra/mocks/TodoListFakeRepository";
import { AddTodoListItemCommand } from "../commands/todoList/AddTodoListItemCommand";
import { DoneTodoListItemCommand } from "../commands/todoList/DoneTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/todoList/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/todoList/SetTodoListItemsCommand";
import { UpdateTodoItemCommand } from "../commands/todoList/UpdateTodoItemCommand";

const item1: TodoItem = {id: "123", description: "test1", status: false};
const item2: TodoItem = {id: "456", description: "test2", status: false};
const item3: TodoItem = {id: "789", description: "test3", status: false};

describe('TodoListStateContainer', ()=> {
    let todoListStateContainer: TodoListStateContainer;

    beforeEach(()=> {
        todoListStateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()));
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
    })

    it('should remove an item into the state list of item', ()=> {
        todoListStateContainer.dispatch(new RemoveTodoListItemCommand("123"));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([item2]);
    })

    it('should upadate status of an item into the state list', ()=> {
        todoListStateContainer.dispatch(new DoneTodoListItemCommand("456"));
        const state = todoListStateContainer.getState();
        expect(state.items[1].status).toBeTrue();
    })

    it('should update description of an item into the state list', ()=> {
        todoListStateContainer.dispatch(new UpdateTodoItemCommand({...item2, description: "new description"}));
        const state = todoListStateContainer.getState();
        expect(state.items[1].description).toBe("new description");
    })

})
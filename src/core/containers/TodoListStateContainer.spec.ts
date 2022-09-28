import { TodoItem } from "../entities/TodoItem";
import { TodoListStateContainer } from "./TodoListStateContainer";
import { TodoListEffect } from "../effects/TodoListEffect";
import { TodoListFakeRepository } from "src/infra/mocks/TodoListFakeRepository";
import { AddTodoListItemCommand } from "../commands/AddTodoListItemCommand";
import { DoneTodoListItemCommand } from "../commands/DoneTodoListItemCommand";
import { RemoveTodoListItemCommand } from "../commands/RemoveTodoListItemCommand";
import { SetTodoListItemsCommand } from "../commands/SetTodoListItemsCommand";
import { UpdateDescriptionItemCommand } from "../commands/UpdateDescriptionItemCommand";



describe('TodoListStateContainer', ()=> {
    let todoListStateContainer: TodoListStateContainer;

    beforeEach(()=> {
        todoListStateContainer = new TodoListStateContainer(new TodoListEffect(new TodoListFakeRepository()));
        todoListStateContainer.dispatch(new SetTodoListItemsCommand([new TodoItem("123", ""), new TodoItem("456", "")]));
    })

    it('should have an initial state as empty list of item', ()=> {
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([new TodoItem("123", ""), new TodoItem("456", "")]);
    })

    it('should set items list into state', ()=> {
        todoListStateContainer.dispatch(new SetTodoListItemsCommand([new TodoItem("123", ""), new TodoItem("456", "")]));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([new TodoItem("123", ""), new TodoItem("456", "")]);
    })

    it('should add an item into the state list of item', ()=> {
        todoListStateContainer.dispatch(new AddTodoListItemCommand(new TodoItem("789", "")));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([new TodoItem("123", ""), new TodoItem("456", ""), new TodoItem("789", "")]);
    })

    it('should remove an item into the state list of item', ()=> {
        todoListStateContainer.dispatch(new RemoveTodoListItemCommand("123"));
        const state = todoListStateContainer.getState();
        expect(state.items).toEqual([new TodoItem("456", "")]);
    })

    it('should upadate status of an item into the state list', ()=> {
        todoListStateContainer.dispatch(new DoneTodoListItemCommand("456"));
        const state = todoListStateContainer.getState();
        expect(state.items[1].getStatus()).toBeTrue();
    })

    it('should update description of an item into the state list', ()=> {
        todoListStateContainer.dispatch(new UpdateDescriptionItemCommand({id: "456", update: "new description"}));
        const state = todoListStateContainer.getState();
        expect(state.items[1].getDescription()).toBe("new description");
    })

})
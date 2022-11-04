
import { Action } from "../../shared/actions/Action";
import { TodoItem } from "../entities/TodoItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { TodoListState } from "../interfaces/states/TodoListState";



export class TodoListStateReducer {

    reduceState(initialState: TodoListState, command: Action): TodoListState {
        switch (command.getName()) {
            case "addItem":
                return {
                    ...initialState,
                    items: [...initialState.items, command.getPayload()],
                    onSuccessSave: true
                };

            case "setItems":
                return {
                    ...initialState,
                    items: command.getPayload()
                };

            case "removeItem":
                return {
                    ...initialState,
                    items: this.removeItem(initialState.items, command.getPayload())
                };

            case "doneItem":
                return {
                    ...initialState,
                    items: this.doneItemStatus(initialState.items, command.getPayload())
                };

            case "updateItem":
                return {
                    ...initialState,
                    items: this.updateItem(initialState.items, command.getPayload())
                };

            case "onException": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
                
            case "exceptionHandled": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                }

            case "todoItemSaved":
                return {
                    ...initialState,
                    onSuccessSave: false
                }

            default: throw new CommandNotFoundException();
        }
    }

    private removeItem(list: TodoItem[], deletedId: string): TodoItem[] {
        return list.filter((item: TodoItem) => item.getId() !== deletedId)
    }

    private doneItemStatus(list: TodoItem[], doneId: string): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.getId() === doneId ) item.setStatus(true);
            return item;
        })
    }

    private updateItem(list: TodoItem[], updatedItem: TodoItem ): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.getId() === updatedItem.getId()) item = updatedItem;
            return item;
        })
    }
}
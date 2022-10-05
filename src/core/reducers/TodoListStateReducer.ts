import { Command } from "src/shared/command/Command";
import { TodoItem } from "../entities/TodoItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { TodoListState } from "../interfaces/states/TodoListState";



export class TodoListStateReducer {

    reduceState(initialState: TodoListState, command: Command): TodoListState {
        switch (command.getName()) {
            case "addItem":
                return {
                    ...initialState,
                    items: [...initialState.items, command.getPayload()]
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

            case "itemAlreadyExist":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };

            case "itemNotExist":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };

            case "canNotModify":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };
                
            default: throw new CommandNotFoundException();
            
        }
    }

    private removeItem(list: TodoItem[], deletedId: string): TodoItem[] {
        return list.filter((item: TodoItem) => item.id !== deletedId)
    }

    private doneItemStatus(list: TodoItem[], doneId: string): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.id === doneId ) item.status = true;
            return item;
        })
    }

    private updateItem(list: TodoItem[], updatedItem: TodoItem ): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.id === updatedItem.id) item = updatedItem;
            return item;
        })
    }
}
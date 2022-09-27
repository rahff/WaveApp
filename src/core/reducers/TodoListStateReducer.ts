import { Command } from "src/shared/command/Command";
import { TodoItem } from "../entities/TodoItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { TodoListCommandPayload } from "../interfaces/command-payloads";
import { TodoListState } from "../interfaces/TodoListState";

export class TodoListStateReducer {

    reduceState(initialState: TodoListState, command: Command<TodoListCommandPayload>): TodoListState {
        switch (command.getName()) {
            case "addItem":
                return {
                    ...initialState,
                    items: [...initialState.items, command.getPayload() as TodoItem]
                }
            case "setItems":
                return {
                    ...initialState,
                    items: command.getPayload() as TodoItem[]
                }
            case "removeItem":
                return {
                    ...initialState,
                    items: this.removeItem(initialState.items, command.getPayload() as string)
                }
            case "doneItem":
                return {
                    ...initialState,
                    items: this.doneItemStatus(initialState.items, command.getPayload() as string)
                }
            case "updateDescriptionItem":
                return {
                    ...initialState,
                    items: this.updateDescriptionItem(initialState.items, command.getPayload() as {id: string, update: string})
                }
                
            default: throw new CommandNotFoundException();
            
        }
    }

    private removeItem(list: TodoItem[], deletedId: string): TodoItem[] {
        return list.filter((item: TodoItem) => item.getId() !== deletedId)
    }

    private doneItemStatus(list: TodoItem[], doneId: string): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.getId() === doneId ) item.done();
            return item;
        })
    }

    private updateDescriptionItem(list: TodoItem[], payload: {id: string, update: string} ): TodoItem[] {
        return list.map((item: TodoItem) => {
            if(item.getId() == payload.id)  item.description = payload.update;
            return item;
        })
    }
}
import { TodoListAsyncCommandPayload } from "src/infra/interfaces/command-payloads";
import { Command } from "src/shared/command/Command";
import { TodoListEffect } from "../effects/TodoListEffect";
import { TodoListCommandPayload } from "../interfaces/command-payloads";
import { TodoListState } from "../interfaces/TodoListState";
import { StateContainer } from "../ports/driver/StateContainer";
import { TodoListStateReducer } from "../reducers/TodoListStateReducer";



export class TodoListStateContainer implements StateContainer {

    private state: TodoListState = { items: [] };
    private reducer: TodoListStateReducer = new TodoListStateReducer();
    
    constructor(private effect: TodoListEffect){}

    public getState(): TodoListState {
        return this.state;
    }

    public dispatch(command: Command<TodoListCommandPayload>): void {
        try {
            this.state = this.reducer.reduceState(this.state, command);
        } catch (error) {
            this.reDispacth(command);
        }
    }

    private async reDispacth(command: Command<TodoListCommandPayload>): Promise<void> {
        const _command = await this.effect.createEffect(command);
        this.dispatch(_command);
    }
}
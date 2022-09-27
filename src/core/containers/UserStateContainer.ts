import { Command } from "src/shared/command/Command";
import { UserCommandPayload } from "../interfaces/command-payloads";
import { UserState } from "../interfaces/UserState";
import { StateContainer } from "../ports/driver/StateContainer";
import { UserStateReducer } from "../reducers/UserStateReducer";



export class UserStateContainer implements StateContainer{

    private state: UserState = { user: null };

    constructor(private reducer: UserStateReducer){}

    public getState(): UserState {
        return this.state;
    }

    public dispatch(command: Command<UserCommandPayload> ): void {
        this.state = this.reducer.reduceState(this.state, command);
    }
}
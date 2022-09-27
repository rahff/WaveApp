import { Command } from "src/shared/command/Command";
import { User } from "../entities/User";
import { UserCommandPayload } from "../interfaces/command-payloads";
import { UserState } from "../interfaces/UserState";

export class UserStateReducer {

    public reduceState(initialState: UserState, command: Command<UserCommandPayload>): UserState {
        switch (command.getName()) {
            case "setUser":
                return {
                    ...initialState,
                    user: command.getPayload() as User
                }
        
            default: return initialState

        }
    }
}
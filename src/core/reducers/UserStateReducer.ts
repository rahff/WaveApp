import { Command } from "src/shared/command/Command";
import { User } from "../entities/User";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { UserState } from "../interfaces/states/UserState";



export class UserStateReducer {

    public reduceState(initialState: UserState, command: Command): UserState {
        switch (command.getName()) {
            case "setUser":
                return {
                    ...initialState,
                    user: command.getPayload() as User
                }
            case "setIsAuth":
                return {
                    ...initialState,
                    isAuth: command.getPayload()
                }
            case "wrongPassword":
                return {
                    ...initialState,
                    onWrongPassword: true
                }
            case "invalidForm":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
            default: throw new CommandNotFoundException();
        }
    }
}
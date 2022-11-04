
import { Action } from "../../shared/actions/Action";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { UserState } from "../interfaces/states/UserState";



export class UserStateReducer {

    public reduceState(initialState: UserState, command: Action): UserState {
        switch (command.getName()) {
            case "setUser":
                return {
                    ...initialState,
                    signupEvent: false,
                    user: command.getPayload(),
                    isAuth: false,
                };

            case "setIsAuth":
                return {
                    ...initialState,
                    isAuth: command.getPayload()
                };

            case "signupEvent":
                return {
                    ...initialState,
                    signupEvent: command.getPayload()
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

            case "userConnexion":
                return {
                    ...initialState,
                    isAuth: command.getPayload()
                }

            default: throw new CommandNotFoundException();
        }
    }
}
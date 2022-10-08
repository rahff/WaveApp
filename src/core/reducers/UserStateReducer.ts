import { Action } from "src/shared/actions/Action";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { UserState } from "../interfaces/states/UserState";



export class UserStateReducer {

    public reduceState(initialState: UserState, command: Action): UserState {
        switch (command.getName()) {
            case "setUser":
                return {
                    ...initialState,
                    signupEvent: false,
                    isAuth: true,
                    user: command.getPayload()
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

            case "onError": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }

            case "exceptionThrowed": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                }

            default: throw new CommandNotFoundException();
        }
    }
}
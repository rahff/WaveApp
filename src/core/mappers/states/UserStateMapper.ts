import { IUserState } from "../../../shared/abstract/IUserState";
import { UserState } from "../../interfaces/states/UserState";

export const userStateMapper = (userState: UserState): IUserState => {
    return {
        user: userState.user ? userState.user.asDto() : null,
        isAuth: userState.isAuth,
        signupEvent: userState.signupEvent,
        onException: userState.onException
    }
}
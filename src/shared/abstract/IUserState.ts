
import { IUser } from "../../infra/models/IUser";
import { IBaseState } from "./IBaseState";


export interface IUserState extends IBaseState{
    user: IUser | null;
    isAuth: boolean | undefined;
    signupEvent: boolean | null
}
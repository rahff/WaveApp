import { IUser } from "src/infra/models/IUser";
import { IBaseState } from "./IBaseState";


export interface IUserState extends IBaseState{
    user: IUser | null;
    isAuth: boolean;
    isNewUser: boolean | null
}
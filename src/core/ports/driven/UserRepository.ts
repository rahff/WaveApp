import { IUser } from "../../../infra/models/IUser";
import { Command } from "../../../shared/actions/Action";


export interface UserRepository {
    saveUser(user: IUser): Promise<IUser>;
    getDefaultUser(): Promise<IUser | null>;
    saveUserPhoto(command: Command): Promise<boolean>
}
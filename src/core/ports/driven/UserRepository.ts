import { IUser } from "../../../infra/models/IUser";


export interface UserRepository {
    saveUser(user: IUser): Promise<IUser>;
    loginUser(email: string, password: string): Promise<IUser>;
    getDefaultUser(): Promise<IUser | null>
}
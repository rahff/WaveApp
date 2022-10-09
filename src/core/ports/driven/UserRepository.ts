import { IUser } from "src/infra/models/IUser";


export interface UserRepository {
    saveUser(user: IUser): Promise<IUser>;
    getUser(email: string): Promise<IUser>;
    getDefaultUser(): Promise<IUser | null>
}
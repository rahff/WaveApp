import { User } from "src/core/entities/User";
import { IUser } from "src/infra/models/IUser";

export interface UserRepository {
    saveUser(user: IUser): Promise<IUser>;
    getUser(id: string): Promise<IUser>;
    getDefaultUser(): Promise<IUser | null>
}
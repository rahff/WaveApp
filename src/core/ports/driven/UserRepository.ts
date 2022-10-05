import { User } from "src/core/entities/User";

export interface UserRepository {
    saveUser(user: Omit<User, "id">): Promise<User>;
    getUser(id: string): Promise<User>;
    getDefaultUser(): Promise<User | null>
}
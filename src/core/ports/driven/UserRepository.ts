import { User } from "src/core/entities/User";

export interface UserRepository {
    saveUser(user: User): Promise<User>;
    verifyPassword(password: string): Promise<boolean>;
}
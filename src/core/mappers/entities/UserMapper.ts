import { User } from "src/core/entities/User";
import { IUser } from "../../../infra/models/IUser";

export const userMapper = (pojo: IUser): User => {
    return new User(pojo.username, pojo.email, pojo.password, pojo.id);
}

import { IUser } from "../../../infra/models/IUser";
import { User } from "../../entities/User";



export const userMapper = (pojo: IUser): User => {
    const user = new User(pojo.username, pojo.email, pojo.password, pojo.id);
    user.setIsAuth(pojo.isAuth, pojo.token);
    return user;
}
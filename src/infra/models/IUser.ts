export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    isAuth: boolean;
    token: string | null
}
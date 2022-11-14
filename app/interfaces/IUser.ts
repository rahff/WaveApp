
export interface IUser {
    username: string;
    email: string;
    photo: string;
    id: string
}
export const fakeUser: IUser = {
    photo: "user.png",
    email: "useremail@gmail.com",
    username: "user",
    id: "12121212"
}
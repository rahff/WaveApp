import { User } from "../entities/User";
import { BaseState } from "./BaseState";

export interface UserState extends BaseState {
    user: User | null
}
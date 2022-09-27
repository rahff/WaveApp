import { TodoItem } from "../entities/TodoItem";
import { BaseState } from "./BaseState";

export interface TodoListState extends BaseState {
    items: TodoItem[]
}

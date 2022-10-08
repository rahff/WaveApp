import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "../../../infra/models/ITodoItem";

export const todoItemMapper = (pojo: ITodoItem): TodoItem => {
    return new TodoItem(pojo.description, pojo.id, pojo.status);
}
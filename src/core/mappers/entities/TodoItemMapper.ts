import { ITodoItem } from "../../../infra/models/ITodoItem";
import { TodoItem } from "../../entities/TodoItem";



export const todoItemMapper = (pojo: ITodoItem): TodoItem => {
    return new TodoItem(pojo.description, pojo.id, pojo.status);
}
import { ITodoListState } from "src/shared/abstract/ITodoListState";
import { TodoItem } from "../../entities/TodoItem";
import { TodoListState } from "../../interfaces/states/TodoListState";

export const todoListStateMapper = (state: TodoListState): ITodoListState => {
    return {
        items: state.items.map((item: TodoItem) => item.asDto()),
        onException: state.onException
    }
}
import { TodoListAsyncCommandPayload } from "src/infra/interfaces/command-payloads";
import { TodoItem } from "../entities/TodoItem";
import { User } from "../entities/User";

export type UserCommandPayload  = User;
export type TodoListSyncCommandPayload = TodoItem | TodoItem[] | string | {id: string, update: string}
export type TodoListCommandPayload = TodoListSyncCommandPayload | TodoListAsyncCommandPayload;
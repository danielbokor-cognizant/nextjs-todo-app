import { OptimisticTodoList } from "./OptimisticTodoList";
import { TodoItem } from "./TodoItem";
import { fetchTodos } from "@/actions";

export async function TodoList() {
    const todos = await fetchTodos();

    return (<OptimisticTodoList initialTodos={todos} />)
}
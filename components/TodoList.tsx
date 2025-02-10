import { OptimisticTodoList } from "./OptimisticTodoList";
import { fetchTodos } from "@/actions";

export async function TodoList() {
    const todos = await fetchTodos();

    return (<OptimisticTodoList initialTodos={todos} />)
}
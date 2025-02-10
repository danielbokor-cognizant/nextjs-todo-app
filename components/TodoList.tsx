import { TodoItem } from "./TodoItem";
import { fetchTodos } from "@/actions";

export async function TodoList() {
    const todos = await fetchTodos();

    return (<ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
    </ul>)
}
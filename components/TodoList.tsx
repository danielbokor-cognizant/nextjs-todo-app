const { API_URL } = process.env;

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${API_URL}/todos`);

    if (!res.ok) {
        throw new Error('Could not fetch todos.')
    }

    return res.json();
}

export async function TodoList() {
    const todos = await fetchTodos();

    return (<ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>)
}
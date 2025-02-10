import { Todo } from "@/types"

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    return (
        <li>
            <input id={todo.id} type="checkbox" checked={todo.completed} />
            <label htmlFor={todo.id} className={`${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.title}</label>
        </li>
    );
}
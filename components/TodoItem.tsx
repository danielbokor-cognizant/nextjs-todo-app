"use client"

import { Todo } from "@/types"

interface TodoItemProps {
    todo: Todo;
    onToggle: (todo: Todo) => Promise<void>
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
    const handleChange = async () => {
        // await toggleTodo(todo);
        await onToggle(todo);
    }

    return (
        <li className="flex items-center space-x-2">
            <input id={todo.id} type="checkbox" checked={todo.completed} onChange={handleChange} className="cursor-pointer" />
            <label htmlFor={todo.id} className={`flex-grow cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.title}</label>
        </li>
    );
}
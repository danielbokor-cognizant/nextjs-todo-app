"use server"

import { Todo } from "@/types";
import { revalidatePath } from "next/cache";

const { API_URL } = process.env;

export async function fetchTodos(): Promise<Todo[]> {
    await new Promise((res) => {
        setTimeout(res, 500);
    })

    const res = await fetch(`${API_URL}/todos`);

    if (!res.ok) {
        throw new Error('Could not fetch todos.');
    }

    return res.json();
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
    await new Promise((res) => {
        setTimeout(res, 500);
    })

    const res = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...todo,
            completed: !todo.completed,
        })
    });

    if (!res.ok) {
        throw new Error('Could not toggle todo.');
    }

    const newTodo = await res.json();
    
    revalidatePath("/");

    return newTodo;
}

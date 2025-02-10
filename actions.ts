"use server"

import { Todo } from "@/types";
import { revalidatePath } from "next/cache";

const { API_URL } = process.env;

export async function fetchTodos(): Promise<Todo[]> {
    await new Promise((res) => {
        setTimeout(res, 1000);
    })

    const res = await fetch(`${API_URL}/todos`);

    if (!res.ok) {
        throw new Error('Could not fetch todos.');
    }

    return res.json();
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
    await new Promise((res) => {
        setTimeout(res, 1000);
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

export async function addTodo(data: FormData): Promise<void> {
    await new Promise((res) => {
        setTimeout(res, 1000);
    })

    const title = data.get("title") as string;

    const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    })

    if (!res.ok) {
        throw new Error("Failed to add todo.")
    }

    await res.json();

    revalidatePath("/");
}
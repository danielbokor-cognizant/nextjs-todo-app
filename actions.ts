"use server"

import { Todo } from "@/types";

const { API_URL } = process.env;
export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${API_URL}/todos`);

    if (!res.ok) {
        throw new Error('Could not fetch todos.');
    }

    return res.json();
}

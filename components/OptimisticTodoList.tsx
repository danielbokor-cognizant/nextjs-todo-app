"use client"

import { Todo } from "@/types";
import { startTransition, useOptimistic } from "react";
import { TodoItem } from "./TodoItem";
import { addTodo, toggleTodo } from "@/actions";
import { AddTodoForm } from "./AddTodoForm";

interface OptimisticTodoListProps {
    initialTodos: Todo[];
}

type OptimisticAction = | { type: "TOGGLE_TODO", todo: Todo}
| { type: "ADD_TODO", todo: Todo}
| { type: "REMOVE_TODO", id: string};

export function OptimisticTodoList({ initialTodos }: OptimisticTodoListProps) {
    const [optimisiticTodos, setOptimisticTodo] = useOptimistic(initialTodos, (state, action: OptimisticAction) => {
        switch (action.type) {
            case "TOGGLE_TODO": 
                return state.map((optimisticTodo) => optimisticTodo.id === action.todo.id ? ({
                    ...optimisticTodo,
                    completed: !optimisticTodo.completed
                }) : optimisticTodo);

            case "ADD_TODO":
                return [
                    ...state,
                    action.todo,
                ];

            case "REMOVE_TODO":
                return state.filter(optimisticTodo => optimisticTodo.id !== action.id)

            default:
                return state;
        }
    });

    const handleToggle = async (todo: Todo) => {
        startTransition(() => {
            setOptimisticTodo({
                type: "TOGGLE_TODO",
                todo,
            })
        })

        try {
            await toggleTodo(todo);
        } catch (e) {
            startTransition(() => {
                setOptimisticTodo({
                    type: "TOGGLE_TODO",
                    todo,
                })
            });
        }
    }

    const handleAdd = async (data: FormData) => {
        const title = data.get("title") as string;

        const optimisticTodoPayload = {
            id: Date.now().toString(),
            title,
            completed: false,
        } as Todo;
 
        startTransition(() => {
            setOptimisticTodo({
                type: "ADD_TODO",
                todo: optimisticTodoPayload,
            })
        })

        try {
            await addTodo(data)
        } catch (e) {
            startTransition(() => {
                setOptimisticTodo({
                    type: "REMOVE_TODO",
                    id: optimisticTodoPayload.id,
                });
            })
        }
    }

    return (
        <>
            <AddTodoForm onAdd={handleAdd} />
            <ul className="space-y-2">
                {optimisiticTodos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={handleToggle}/>)}
            </ul>
        </>
    )
}
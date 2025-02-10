"use client"

import { Todo } from "@/types";
import { startTransition, useOptimistic } from "react";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "@/actions";

interface OptimisticTodoListProps {
    initialTodos: Todo[];
}

type OptimisticAction = | { type: "TOGGLE_TODO", todo: Todo};

export function OptimisticTodoList({ initialTodos }: OptimisticTodoListProps) {
    const [optimisiticTodos, setOptimisticTodo] = useOptimistic(initialTodos, (state, action: OptimisticAction) => {
        switch (action.type) {
            case "TOGGLE_TODO": 
                return state.map((optimisticTodo) => optimisticTodo.id === action.todo.id ? ({
                    ...optimisticTodo,
                    completed: !optimisticTodo.completed
                }) : optimisticTodo);

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

    return (<ul className="space-y-2">
            {optimisiticTodos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={handleToggle}/>)}
        </ul>
    )
}
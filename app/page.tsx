import { TodoList } from "@/components/TodoList";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <h1>Todos:</h1>
      <Suspense fallback={<TodoListSkeleton/>}>
        <TodoList />
      </Suspense>
    </main>
  );
}

function TodoListSkeleton() {
  return [...Array(5)].map((_, i) => (
    <div key={`todo-skeleton-${i}`} className="flex space-x-2 mb-2">
      <Skeleton className="w-4 h-4 rounded bg-gray-300" />
      <Skeleton className="h-4 w-1/2 bg-gray-300" />
    </div>
  ))
}

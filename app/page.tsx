import { TodoList } from "@/components/TodoList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todos:</h1>
      <Suspense fallback={<TodoListSkeleton/>}>
        <TodoList />
      </Suspense>
    </main>
  );
}

function TodoListSkeleton() {
  return <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={`todo-skeleton-${i}`} className="flex space-x-2">
        <Skeleton className="w-4 h-4 rounded bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
      </div>
    ))}
  </div>
}

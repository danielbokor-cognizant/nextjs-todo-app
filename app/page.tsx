import { TodoList } from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Todos:</h1>
      <TodoList />
    </main>
  );
}

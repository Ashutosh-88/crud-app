import TodoForm from "@/components/forms/TodoForm";

export default async function TodoRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <TodoForm />
    </div>
  );
}

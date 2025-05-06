import TodoForm from "@/components/forms/TodoForm";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export default async function TodoRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <TodoForm />
    </div>
  );
}

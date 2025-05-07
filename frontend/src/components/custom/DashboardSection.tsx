import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { fetchTodos } from "@/data/actions/todo-actions";
import { StrapiImage } from "./StrapiImage";
import { TaskChartWrapper } from "./TaskChartWrapper";

export async function DashboardSection() {
  const user = await getUserMeLoader();
  const userData = user.data;
  console.log(userData);

  console.log("===============");
  const tasks = await fetchTodos();
  console.log(tasks);
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <StrapiImage
              src={userData?.image?.url}
              alt={`${userData?.firstName}'s profile pic`}
              height={200}
              width={200}
              className="w-16 h-16 rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {`${userData?.firstName} ${userData?.lastName}`}
            </h2>
            {/* Stats Section */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Task Overview
            </h3>
            <TaskChartWrapper tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}

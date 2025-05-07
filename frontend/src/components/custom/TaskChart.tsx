"use Client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Task } from "@/data/types/task";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskChartProps {
  tasks: Task[];
}

export const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const completed = tasks.filter((task) => task.completed).length;
  const notCompleted = tasks.length - completed;

  const data = {
    labels: [
      `Completed Tasks: ${completed}`,
      `Not Completed Tasks: ${notCompleted}`,
    ],
    datasets: [
      {
        label: "Tasks",
        data: [completed, notCompleted],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#22c55e", "#ef4444"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔑 allows manual sizing
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto h-64">
        <h2 className="text-2xl font-semibold text-red-800 dark:text-white text-center">
          !No Tasks to show here!
        </h2>
        <Pie data={data} options={options} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

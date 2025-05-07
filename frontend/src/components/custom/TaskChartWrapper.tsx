// components/custom/TaskChartWrapper.tsx
"use client";

import React from "react";
import { Task } from "@/data/types/task";
import { TaskChart } from "./TaskChart";

interface TaskChartWrapperProps {
  tasks: Task[];
}

export const TaskChartWrapper: React.FC<TaskChartWrapperProps> = ({
  tasks,
}) => {
  return <TaskChart tasks={tasks} />;
};

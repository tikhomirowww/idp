import { FC } from "react";
import { TaskList } from "@features/TaskList";
import { TaskForm } from "@features/TaskForm";

export const TaskManagerWidget: FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

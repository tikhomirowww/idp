import { AppDispatch, RootState } from "@app/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import "./TaskList.scss";
import { fetchTasks, toggleTask } from "@entities/task/actions";

export const TaskList: FC = () => {
  const { tasks, error, loading } = useSelector(
    (state: RootState) => state.task
  );
  const dispatch = useDispatch<AppDispatch>(); // Add type here
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onTaskToggle = (task: any) => {
    dispatch(toggleTask(task));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          className={classNames({ completed: task.completed })}
          onClick={() => onTaskToggle(task)}
          key={task.id}
        >
          <p>{task.title}</p> {task.completed ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
};

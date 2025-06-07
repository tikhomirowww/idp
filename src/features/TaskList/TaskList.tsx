import { AppDispatch, RootState } from "@app/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import "./TaskList.scss";
import { deleteTask, fetchTasks, toggleTask } from "@entities/task/actions";

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

  const removeTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className={classNames({ completed: task.completed })} key={task.id}>
          <div
            onClick={() => onTaskToggle(task)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <p>{task.title}</p> {task.completed ? "✅" : "❌"}
          </div>
          <button onClick={() => removeTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

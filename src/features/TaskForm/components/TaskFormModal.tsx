import { AppDispatch } from "@app/store";
import { addNewTask } from "@entities/task/actions";
import { useModal } from "@shared/UI/Modal/lib";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export const TaskFormModal: FC = () => {
  const { close } = useModal();

  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewTask({ title, completed: false }));
    close();
  };

  return (
    <form onSubmit={handleAddTask}>
      <h2 style={{ textAlign: "center" }}>Add task</h2>
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        type="text"
        placeholder="Title"
      />
      <button>Add</button>
    </form>
  );
};

import { FC } from "react";
import { TaskFormModal } from "./components";
import { useModal } from "@shared/UI/Modal/lib";

export const TaskForm: FC = () => {
  const { open } = useModal(<TaskFormModal />);

  return (
    <div>
      <button onClick={open}>Add task</button>
    </div>
  );
};

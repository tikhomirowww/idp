import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskService } from "../../shared/api/taskService";
import { Task } from "./types"; // Assuming you'll move types here too

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await TaskService.getTasks();
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch tasks"
    );
  }
});

export const addNewTask = createAsyncThunk<
  Task,
  { title: string; completed: boolean },
  { rejectValue: string }
>("tasks/addNewTask", async (task, { rejectWithValue }) => {
  try {
    const response = await TaskService.addTask(task);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to add task"
    );
  }
});

export const toggleTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "tasks/toggleTask",
  async (task, { rejectWithValue, dispatch }) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await TaskService.updateTask(task.id, updatedTask);
      dispatch(fetchTasks());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to toggle task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("tasks/toggleTask", async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await TaskService.deleteTask(id);
    dispatch(fetchTasks());
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to toggle task"
    );
  }
});

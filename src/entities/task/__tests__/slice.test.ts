import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice";
import { fetchTasks, addNewTask, toggleTask } from "../actions";
import { Task, TaskState } from "../types";

jest.mock("@shared/api/taskService", () => ({
  TaskService: {
    getTasks: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

interface RootState {
  task: TaskState;
}

describe("taskSlice with mocking data and functions", () => {
  let store: ReturnType<typeof configureStore<RootState>>;

  beforeEach(() => {
    store = configureStore<RootState>({ reducer: { task: taskReducer } });
    jest.clearAllMocks();
  });

  it("fetch tasks with mocked TaskService.getTasks", async () => {
    const mockTasks: Task[] = [{ id: 1, title: "Task 1", completed: false }];
    const { getTasks } = require("@shared/api/taskService").TaskService;
    (getTasks as jest.Mock).mockResolvedValue({ data: mockTasks });

    await store.dispatch(fetchTasks());

    const state = store.getState().task;
    expect(getTasks).toHaveBeenCalled();
    expect(state.tasks).toEqual(mockTasks);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("handles error with mocked TaskService.getTasks", async () => {
    const { getTasks } = require("@shared/api/taskService").TaskService;
    (getTasks as jest.Mock).mockRejectedValue(new Error("Rejected"));

    await store.dispatch(fetchTasks());

    const state = store.getState().task;
    expect(getTasks).toHaveBeenCalled();
    expect(state.error).toBe("Rejected");
  });

  it("add task to mocked TaskService.addTask", async () => {
    const newTask = { id: 1, title: "New Task", completed: false };
    const { addTask } = require("@shared/api/taskService").TaskService;
    (addTask as jest.Mock).mockResolvedValue({ data: newTask });

    await store.dispatch(addNewTask({ title: "New Task", completed: false }));

    const state = store.getState().task;
    expect(addTask).toHaveBeenCalledWith({
      title: "New Task",
      completed: false,
    });
    expect(state.tasks).toContainEqual(newTask);
  });

  it("toggle task with mocked TaskService.updateTask", async () => {
    const initialTask = { id: 1, title: "Task 1", completed: false };
    store = configureStore<RootState>({
      reducer: { task: taskReducer },
      preloadedState: {
        task: {
          tasks: [initialTask],
          loading: false,
          error: null,
        },
      },
    });
    const updatedTask = { id: 1, title: "Task 1", completed: true };
    const { updateTask } = require("@shared/api/taskService").TaskService;
    (updateTask as jest.Mock).mockResolvedValue({ data: updatedTask });

    await store.dispatch(toggleTask(initialTask));

    const state = store.getState().task;
    expect(updateTask).toHaveBeenCalledWith(1, updatedTask);
    expect(state.tasks).toContainEqual(updatedTask);
  });
});

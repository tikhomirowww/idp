import axios from "axios";

// Read API URL from .env file
const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Task API Service
export const TaskService = {
  // Get all tasks
  getTasks: () => api.get("/tasks"),

  // Get a single task by ID
  getTaskById: (id: number) => api.get(`/tasks/${id}`),

  // Add a new task
  addTask: (task: { title: string; completed: boolean }) =>
    api.post("/tasks", task),

  // Update a task
  updateTask: (
    id: number,
    task: Partial<{ title: string; completed: boolean }>
  ) => api.patch(`/tasks/${id}`, task),

  // Delete a task
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
};

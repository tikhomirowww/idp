// src/types/taskService.d.ts
declare module "@shared/api/taskService" {
  export const TaskService: {
    getTasks: () => Promise<{ data: Task[] }>;
    getTaskById: (id: number) => Promise<{ data: Task }>;
    addTask: (task: {
      title: string;
      completed: boolean;
    }) => Promise<{ data: Task }>;
    updateTask: (
      id: number,
      task: Partial<{ title: string; completed: boolean }>
    ) => Promise<{ data: Task }>;
    deleteTask: (id: number) => Promise<void>;
  };

  export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
}

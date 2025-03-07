export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: null | string;
}

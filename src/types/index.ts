export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  priority: 'low' | 'medium' | 'high';
}

export interface AppState {
  tasks: Task[];
  lastSync: number;
}

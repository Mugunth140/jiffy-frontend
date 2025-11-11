import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';
import { StorageService } from './StorageService';

export class TaskManager {
  /**
   * Create a new task
   */
  static async createTask(
    title: string,
    description: string = '',
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: number
  ): Promise<Task> {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      priority,
      dueDate,
    };

    await StorageService.addTask(task);
    return task;
  }

  /**
   * Get all tasks
   */
  static async getAllTasks(): Promise<Task[]> {
    return await StorageService.loadTasks();
  }

  /**
   * Get tasks by filter
   */
  static async getTasksByFilter(filter: {
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<Task[]> {
    const tasks = await StorageService.loadTasks();
    
    return tasks.filter(task => {
      if (filter.completed !== undefined && task.completed !== filter.completed) {
        return false;
      }
      if (filter.priority && task.priority !== filter.priority) {
        return false;
      }
      return true;
    });
  }

  /**
   * Toggle task completion status
   */
  static async toggleTaskCompletion(taskId: string): Promise<void> {
    const tasks = await StorageService.loadTasks();
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      await StorageService.updateTask(taskId, {
        completed: !task.completed,
      });
    }
  }

  /**
   * Update task
   */
  static async updateTask(taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<void> {
    await StorageService.updateTask(taskId, updates);
  }

  /**
   * Delete task
   */
  static async deleteTask(taskId: string): Promise<void> {
    await StorageService.deleteTask(taskId);
  }
}

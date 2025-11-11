import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, AppState } from '../types';

const STORAGE_KEY = '@jiffy_app_state';

export class StorageService {
  /**
   * Save tasks to local storage
   */
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const state: AppState = {
        tasks,
        lastSync: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw error;
    }
  }

  /**
   * Load tasks from local storage
   */
  static async loadTasks(): Promise<Task[]> {
    try {
      const stateJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stateJson) {
        return [];
      }
      const state: AppState = JSON.parse(stateJson);
      return state.tasks || [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Add a new task
   */
  static async addTask(task: Task): Promise<void> {
    try {
      const tasks = await this.loadTasks();
      tasks.push(task);
      await this.saveTasks(tasks);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  /**
   * Update an existing task
   */
  static async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const tasks = await this.loadTasks();
      const index = tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks[index] = { 
          ...tasks[index], 
          ...updates,
          updatedAt: Date.now()
        };
        await this.saveTasks(tasks);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  /**
   * Delete a task
   */
  static async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.loadTasks();
      const filteredTasks = tasks.filter(t => t.id !== taskId);
      await this.saveTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  /**
   * Clear all data
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

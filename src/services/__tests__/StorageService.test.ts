import { StorageService } from '../StorageService';
import { Task } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('StorageService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe('saveTasks and loadTasks', () => {
    it('should save and load tasks', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          priority: 'medium',
        },
      ];

      await StorageService.saveTasks(tasks);
      const loadedTasks = await StorageService.loadTasks();

      expect(loadedTasks).toHaveLength(1);
      expect(loadedTasks[0].title).toBe('Test Task');
    });

    it('should return empty array when no tasks exist', async () => {
      const tasks = await StorageService.loadTasks();
      expect(tasks).toEqual([]);
    });
  });

  describe('addTask', () => {
    it('should add a new task', async () => {
      const task: Task = {
        id: '1',
        title: 'New Task',
        description: '',
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        priority: 'low',
      };

      await StorageService.addTask(task);
      const tasks = await StorageService.loadTasks();

      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe('1');
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const task: Task = {
        id: '1',
        title: 'Original Title',
        description: '',
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        priority: 'low',
      };

      await StorageService.addTask(task);
      await StorageService.updateTask('1', { title: 'Updated Title' });
      
      const tasks = await StorageService.loadTasks();
      expect(tasks[0].title).toBe('Updated Title');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task: Task = {
        id: '1',
        title: 'Task to Delete',
        description: '',
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        priority: 'low',
      };

      await StorageService.addTask(task);
      await StorageService.deleteTask('1');
      
      const tasks = await StorageService.loadTasks();
      expect(tasks).toHaveLength(0);
    });
  });

  describe('clearAll', () => {
    it('should clear all data', async () => {
      const task: Task = {
        id: '1',
        title: 'Test Task',
        description: '',
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        priority: 'low',
      };

      await StorageService.addTask(task);
      await StorageService.clearAll();
      
      const tasks = await StorageService.loadTasks();
      expect(tasks).toEqual([]);
    });
  });
});

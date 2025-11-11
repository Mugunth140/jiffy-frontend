import { Task } from '../types';

export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { task: Task };
};

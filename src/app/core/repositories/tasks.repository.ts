import { Observable } from 'rxjs';
import { Task } from '../models/task';

export interface TasksRepository {
  getSnapshot(): Promise<Task[]>;
  getAll(): Observable<Task[]>;
  add(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
  saveAll(tasks: Task[]): Promise<void>;
}
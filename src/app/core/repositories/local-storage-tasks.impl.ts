import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { TasksRepository } from './tasks.repository';
import { BrowserStorage } from '../services/browser-storage';

@Injectable({ providedIn: 'root' })
export class LocalStorageTasksRepository implements TasksRepository {
  private readonly key = 'tasks';
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(private storage: BrowserStorage) {
    const initial = this.storage.getItem<Task[]>(this.key, []);
    this.tasksSubject.next(initial);
  }
  getSnapshot(): Promise<Task[]> {
    return Promise.resolve(this.tasksSubject.value);
  }

  getAll(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  async add(task: Task): Promise<void> {
    const updated = [...this.tasksSubject.value, task];
    this.persist(updated);
  }

  async update(task: Task): Promise<void> {
    const updated = this.tasksSubject.value.map(t => t.id === task.id ? task : t);
    this.persist(updated);
  }

  async delete(taskId: string): Promise<void> {
    const updated = this.tasksSubject.value.filter(t => t.id !== taskId);
    this.persist(updated);
  }

  async saveAll(tasks: Task[]): Promise<void> {
    this.persist(tasks);
  }

  private persist(tasks: Task[]): void {
    this.storage.setItem(this.key, tasks);
    this.tasksSubject.next(tasks);
  }
}
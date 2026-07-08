import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
  }

  toggleTask(id: string) {
    const updated = this.tasksSubject.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(updated);
  }

  deleteTask(id: string) {
    const updated = this.tasksSubject.value.filter(t => t.id !== id);
    this.tasksSubject.next(updated);
  }
}

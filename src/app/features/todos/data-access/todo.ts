import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
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
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(id: string) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<Category[]>([
    { id: '1', name: 'Trabajo', color: 'primary' },
    { id: '2', name: 'Personal', color: 'success' },
    { id: '3', name: 'Hogar', color: 'warning' }
  ]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() { }

  addTask(title: string, priority: Task['priority'] = 'medium', categoryId?: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      categoryId
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

  addCategory(name: string, color: string = 'medium') {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color
    };
    this.categoriesSubject.next([...this.categoriesSubject.value, newCategory]);
  }

  updateCategory(id: string, name: string, color?: string) {
    const updated = this.categoriesSubject.value.map(c =>
      c.id === id ? { ...c, name, color: color || c.color } : c
    );
    this.categoriesSubject.next(updated);
  }

  deleteCategory(id: string) {
    // Option A: remove categoryId from tasks
    const updatedTasks = this.tasksSubject.value.map(t => 
      t.categoryId === id ? { ...t, categoryId: undefined } : t
    );
    this.tasksSubject.next(updatedTasks);

    const updatedCategories = this.categoriesSubject.value.filter(c => c.id !== id);
    this.categoriesSubject.next(updatedCategories);
  }
}

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/task';
import { Category } from '../../../core/models/category';
import { TasksRepository } from '../../../core/repositories/tasks.repository';
import { TASKS_REPOSITORY, CATEGORIES_REPOSITORY } from '../../../core/repositories/repository.tokens';
import { CategoriesRepository } from '../../../core/repositories/category.repository';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks$: Observable<Task[]>;
  categories$: Observable<Category[]>;

  constructor(
    @Inject(TASKS_REPOSITORY) private tasksRepository: TasksRepository,
    @Inject(CATEGORIES_REPOSITORY) private categoriesRepository: CategoriesRepository
  ) {
    this.tasks$ = this.tasksRepository.getAll();
    this.categories$ = this.categoriesRepository.getAll();
  }

  async addTask(title: string, priority: Task['priority'] = 'medium', categoryId?: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      categoryId
    };

    await this.tasksRepository.add(newTask);
  }

  async toggleTask(id: string) {
    const tasks = await this.tasksRepository.getSnapshot();
    const updatedTask = tasks.find(t => t.id === id);

    if (!updatedTask) return;

    await this.tasksRepository.update({
      ...updatedTask,
      completed: !updatedTask.completed
    });
  }

  async deleteTask(id: string) {
    await this.tasksRepository.delete(id);
  }

  async addCategory(name: string, color: string = 'medium') {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color
    };

    await this.categoriesRepository.add(newCategory);
  }

  async updateCategory(id: string, name: string, color?: string) {
    const categories = await this.categoriesRepository.getSnapshot();
    const current = categories.find(c => c.id === id);

    if (!current) return;

    await this.categoriesRepository.update({
      ...current,
      name,
      color: color || current.color
    });
  }

  async deleteCategory(id: string) {
    const tasks = await this.tasksRepository.getSnapshot();
    const updatedTasks = tasks.map(t =>
      t.categoryId === id ? { ...t, categoryId: undefined } : t
    );

    await this.tasksRepository.saveAll(updatedTasks);
    await this.categoriesRepository.delete(id);
  }
}
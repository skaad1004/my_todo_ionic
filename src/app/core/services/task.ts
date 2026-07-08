import { Inject, Injectable } from '@angular/core';
import { TASKS_REPOSITORY } from '../repositories/repository.tokens';
import { TasksRepository } from '../repositories/tasks.repository';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(
    @Inject(TASKS_REPOSITORY) private tasksRepository: TasksRepository
  ) { }

  getTasks() {
    return this.tasksRepository.getAll();
  }

  addTask(task: any) {
    return this.tasksRepository.add(task);
  }
}
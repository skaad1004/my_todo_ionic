import { InjectionToken } from '@angular/core';
import { TasksRepository } from './tasks.repository';
import { CategoriesRepository } from './category.repository';

export const TASKS_REPOSITORY = new InjectionToken<TasksRepository>('TASKS_REPOSITORY');
export const CATEGORIES_REPOSITORY = new InjectionToken<CategoriesRepository>('CATEGORIES_REPOSITORY');
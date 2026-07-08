// repositories/categories.repository.ts
import { Observable } from 'rxjs';
import { Category } from '../models/category';

export interface CategoriesRepository {
  getSnapshot(): Promise<Category[]>;
  getAll(): Observable<Category[]>;
  add(category: Category): Promise<void>;
  update(category: Category): Promise<void>;
  delete(categoryId: string): Promise<void>;
  saveAll(categories: Category[]): Promise<void>;
}
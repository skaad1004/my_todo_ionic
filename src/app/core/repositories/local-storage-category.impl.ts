import { Injectable } from '@angular/core';
import { CategoriesRepository } from './category.repository';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';
import { BrowserStorage } from '../services/browser-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageCategoryImpl implements CategoriesRepository {

  private readonly key = 'categories';
  private readonly categorySubject = new BehaviorSubject<Category[]>([]);

  constructor(private storage: BrowserStorage) {
    const initial = this.storage.getItem<Category[]>(this.key, []);
    this.categorySubject.next(initial);
  }
  getSnapshot(): Promise<Category[]> {
    return Promise.resolve(this.categorySubject.value);
  }
  getAll(): Observable<Category[]> {
    return this.categorySubject.asObservable();
  }
  add(category: Category): Promise<void> {
    const updated = [...this.categorySubject.value, category];
    this.persist(updated);
    return Promise.resolve();
  }
  update(category: Category): Promise<void> {
    const updated = this.categorySubject.value.map(c => c.id === category.id ? category : c);
    this.persist(updated);
    return Promise.resolve();
  }
  delete(categoryId: string): Promise<void> {
    const updated = this.categorySubject.value.filter(c => c.id !== categoryId);
    this.persist(updated);
    return Promise.resolve();
  }
  saveAll(categories: Category[]): Promise<void> {
    this.persist(categories);
    return Promise.resolve();
  }

  private persist(categories: Category[]): void {
    this.storage.setItem(this.key, categories);
    this.categorySubject.next(categories);
  }
}

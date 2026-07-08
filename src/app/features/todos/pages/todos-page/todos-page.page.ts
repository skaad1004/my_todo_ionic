import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TodoService } from '../../data-access/todo';
import { Task, PRIORITY_ORDER } from '../../../../core/models/task';
import { Category } from '../../../../core/models/category';
import { TodoFormComponent } from '../../ui/todo-form/todo-form.component';
import { TodoListComponent } from '../../ui/todo-list/todo-list.component';
import { ManageCategoriesComponent } from '../../ui/manage-categories/manage-categories.component';
import { RemoteConfigService } from '../../../../core/services/remote-config';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.page.html',
  styleUrls: ['./todos-page.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TodoFormComponent, TodoListComponent]
})
export class TodosPagePage implements OnInit {
  pending$!: Observable<Task[]>;
  completed$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  isPriorityDesc = true;
  selectedCategoryId: string | null = null;
  showManageCategoriesButton = false;

  constructor(
    private todoService: TodoService,
    private modalCtrl: ModalController,
    private remoteConfigService: RemoteConfigService
  ) {
  }


  async ngOnInit() {
    this.categories$ = this.todoService.categories$;
    this.loadTasks();
    await this.remoteConfigService.init();
    this.showManageCategoriesButton =
      await this.remoteConfigService.getPrioritySortEnabled();
  }

  loadTasks() {

    const sortByPriority = (tasks: Task[]) =>
      [...tasks].sort((a, b) => {
        const result = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        return this.isPriorityDesc ? result : -result;
      });

    const filterByCategory = (tasks: Task[]) =>
      this.selectedCategoryId ? tasks.filter(t => t.categoryId === this.selectedCategoryId) : tasks;

    const tasks$ = this.todoService.tasks$;

    this.pending$ = tasks$.pipe(
      map(tasks => sortByPriority(filterByCategory(tasks.filter(t => !t.completed))))
    );

    this.completed$ = tasks$.pipe(
      map(tasks => sortByPriority(filterByCategory(tasks.filter(t => t.completed))))
    );
  }

  setCategoryFilter(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.loadTasks();
  }

  async openManageCategories() {
    const modal = await this.modalCtrl.create({
      component: ManageCategoriesComponent
    });
    return await modal.present();
  }

  togglePriorityOrder() {
    this.isPriorityDesc = !this.isPriorityDesc;
    this.loadTasks();
  }


  addTask(taskData: { title: string; priority: Task['priority']; categoryId?: string }) {
    this.todoService.addTask(taskData.title, taskData.priority, taskData.categoryId);
  }

  toggleTask(id: string) {
    this.todoService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id);
  }
}
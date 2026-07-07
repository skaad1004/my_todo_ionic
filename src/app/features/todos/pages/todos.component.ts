import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TodosService } from '../data-access/todos.service';
import { TodoListComponent } from '../ui/todo-list/todo-list.component';
import { TodoFormComponent } from '../ui/todo-form/todo-form.component';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TodoListComponent,
    TodoFormComponent
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="todo-container">
        <app-todo-form (add)="onAddTask($event)"></app-todo-form>
        <app-todo-list
          [tasks]="(todosService.tasks$ | async) ?? []"
          (toggle)="onToggleTask($event)"
          (delete)="onDeleteTask($event)">
        </app-todo-list>
      </div>
    </ion-content>
  `,
  styles: [`
    .todo-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
  `]
})
export class TodosPageComponent {
  constructor(public todosService: TodosService) { }

  onAddTask(title: string) {
    this.todosService.addTask(title);
  }

  onToggleTask(id: string) {
    this.todosService.toggleTask(id);
  }

  onDeleteTask(id: string) {
    this.todosService.deleteTask(id);
  }
}
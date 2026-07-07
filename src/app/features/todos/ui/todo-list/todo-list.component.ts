import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../models/task.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, IonicModule, TodoItemComponent],
  template: `
    <ion-list>
      <app-todo-item 
        *ngFor="let task of tasks; trackBy: trackById"
        [task]="task"
        (toggle)="toggle.emit($event)"
        (delete)="delete.emit($event)">
      </app-todo-item>
    </ion-list>
    
    <div *ngIf="tasks.length === 0" class="empty-state">
      <p>No tasks yet. Add one above!</p>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--ion-color-medium);
    }
  `]
})
export class TodoListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  trackById(index: number, task: Task): string {
    return task.id;
  }
}

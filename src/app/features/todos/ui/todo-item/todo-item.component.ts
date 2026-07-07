import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../models/task.model';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-item>
      <ion-checkbox 
        slot="start" 
        [checked]="task.completed" 
        (ionChange)="onToggle()">
      </ion-checkbox>
      <ion-label [class.completed]="task.completed">
        {{ task.title }}
      </ion-label>
      <ion-button slot="end" fill="clear" color="danger" (click)="onDelete()">
        <ion-icon name="trash-outline"></ion-icon>
      </ion-button>
    </ion-item>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
      color: var(--ion-color-medium);
    }
  `]
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() {
    addIcons({ trashOutline });
  }

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../models/task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onRemove() {
    this.remove.emit(this.task.id);
  }
}

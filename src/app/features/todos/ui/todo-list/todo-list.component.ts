import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../../../core/models/task';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TodoItemComponent]
})
export class TodoListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  onToggle(id: string) {
    this.toggle.emit(id);
  }

  onRemove(id: string) {
    this.remove.emit(id);
  }
}

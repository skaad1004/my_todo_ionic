import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../../../core/models/task';
import { Category } from '../../../../core/models/category';
import { TodoService } from '../../data-access/todo';
import { Observable } from 'rxjs';

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

  categories$!: Observable<Category[]>;

  constructor(private todoService: TodoService) {
    this.categories$ = this.todoService.categories$;
  }

  getCategory(categories: Category[] | null, id?: string): Category | undefined {
    return categories?.find(c => c.id === id);
  }

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onRemove() {
    this.remove.emit(this.task.id);
  }
}

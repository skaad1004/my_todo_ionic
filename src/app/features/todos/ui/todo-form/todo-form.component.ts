import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskPriority } from '../../models/task';
import { Category } from '../../models/category';
import { TodoService } from '../../data-access/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TodoFormComponent {
  @Output() addTask = new EventEmitter<{ title: string; priority: TaskPriority, categoryId?: string }>();

  categories$!: Observable<Category[]>;

  constructor(private todoService: TodoService) {
    this.categories$ = this.todoService.categories$;
  }

  newTitle = '';
  priority: TaskPriority = 'medium';
  categoryId?: string;

  submit() {
    const title = this.newTitle.trim();

    if (title) {
      this.addTask.emit({
        title,
        priority: this.priority,
        categoryId: this.categoryId
      });

      this.newTitle = '';
      this.priority = 'medium';
      this.categoryId = undefined;
    }
  }
}
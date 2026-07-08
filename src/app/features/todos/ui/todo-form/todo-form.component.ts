import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskPriority } from '../../models/task';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class TodoFormComponent {
  @Output() addTask = new EventEmitter<{ title: string; priority: TaskPriority }>();

  newTitle = '';
  priority: TaskPriority = 'medium';

  submit() {
    const title = this.newTitle.trim();

    if (title) {
      this.addTask.emit({
        title,
        priority: this.priority
      });

      this.newTitle = '';
      this.priority = 'medium';
    }
  }
}
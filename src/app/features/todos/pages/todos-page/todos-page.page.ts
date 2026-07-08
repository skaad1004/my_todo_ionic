import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from '../../data-access/todo';
import { Task } from '../../models/task';
import { TodoFormComponent } from '../../ui/todo-form/todo-form.component';
import { TodoListComponent } from '../../ui/todo-list/todo-list.component';

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

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    const tasks$ = this.todoService.tasks$;
    this.pending$ = tasks$.pipe(map(tasks => tasks.filter(t => !t.completed)));
    this.completed$ = tasks$.pipe(map(tasks => tasks.filter(t => t.completed)));
  }

  addTask(title: string) {
    this.todoService.addTask(title);
  }

  toggleTask(id: string) {
    this.todoService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id);
  }
}
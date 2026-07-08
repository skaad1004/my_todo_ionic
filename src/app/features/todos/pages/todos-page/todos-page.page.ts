import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from '../../data-access/todo';
import { Task, PRIORITY_ORDER } from '../../models/task';
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
  isPriorityDesc = true;

  constructor(private todoService: TodoService) { }


  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {

    const sortByPriority = (tasks: Task[]) =>
      [...tasks].sort((a, b) => {
        const result = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        return this.isPriorityDesc ? result : -result;
      });

    const tasks$ = this.todoService.tasks$;

    this.pending$ = tasks$.pipe(
      map(tasks => sortByPriority(tasks.filter(t => !t.completed)))
    );

    this.completed$ = tasks$.pipe(
      map(tasks => sortByPriority(tasks.filter(t => t.completed)))
    );
  }

  togglePriorityOrder() {
    this.isPriorityDesc = !this.isPriorityDesc;
    this.loadTasks();
  }


  addTask(taskData: { title: string; priority: Task['priority'] }) {
    this.todoService.addTask(taskData.title, taskData.priority);
  }

  toggleTask(id: string) {
    this.todoService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id);
  }
}
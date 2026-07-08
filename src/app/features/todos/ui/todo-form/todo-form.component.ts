import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class TodoFormComponent implements OnInit {
  @Output() addTask = new EventEmitter<string>();
  newTitle = '';

  constructor() { }

  ngOnInit() { }

  submit() {
    if (this.newTitle.trim()) {
      this.addTask.emit(this.newTitle.trim());
      this.newTitle = '';
    }
  }

}

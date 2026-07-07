import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  template: `
    <ion-item>
      <ion-input 
        [(ngModel)]="title" 
        (keyup.enter)="onSubmit()"
        placeholder="Add a new task...">
      </ion-input>
      <ion-button slot="end" (click)="onSubmit()" [disabled]="!title.trim()">
        <ion-icon name="add-outline" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-item>
  `,
  styles: [`
    ion-item {
      --padding-start: 0;
    }
  `]
})
export class TodoFormComponent {
  @Output() add = new EventEmitter<string>();
  title = '';

  constructor() {
    addIcons({ addOutline });
  }

  onSubmit() {
    if (this.title.trim()) {
      this.add.emit(this.title.trim());
      this.title = '';
    }
  }
}

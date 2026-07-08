import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { TodoService } from '../../data-access/todo';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ManageCategoriesComponent implements OnInit {
  categories$!: Observable<Category[]>;
  newCategoryName = '';
  newCategoryColor = 'primary';

  editingCategoryId: string | null = null;
  editCategoryName = '';
  editCategoryColor = 'primary';

  constructor(
    private todoService: TodoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.categories$ = this.todoService.categories$;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  addCategory() {
    const name = this.newCategoryName.trim();
    if (name) {
      this.todoService.addCategory(name, this.newCategoryColor);
      this.newCategoryName = '';
      this.newCategoryColor = 'primary';
    }
  }

  startEdit(category: Category) {
    this.editingCategoryId = category.id;
    this.editCategoryName = category.name;
    this.editCategoryColor = category.color || 'primary';
  }

  saveEdit() {
    if (this.editingCategoryId && this.editCategoryName.trim()) {
      this.todoService.updateCategory(this.editingCategoryId, this.editCategoryName.trim(), this.editCategoryColor);
      this.editingCategoryId = null;
    }
  }

  cancelEdit() {
    this.editingCategoryId = null;
  }

  deleteCategory(id: string) {
    this.todoService.deleteCategory(id);
  }
}

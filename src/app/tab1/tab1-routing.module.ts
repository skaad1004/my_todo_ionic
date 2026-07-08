import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosPagePage } from '../features/todos/pages/todos-page/todos-page.page';
const routes: Routes = [
  {
    path: '',
    component: TodosPagePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }

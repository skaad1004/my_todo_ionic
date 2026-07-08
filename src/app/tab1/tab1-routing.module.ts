import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosPagePageModule } from '../features/todos/pages/todos-page/todos-page.module';
const routes: Routes = [
  {
    path: '',
    component: TodosPagePageModule,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }

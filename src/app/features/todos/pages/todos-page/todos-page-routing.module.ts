import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosPagePage } from './todos-page.page';

const routes: Routes = [
  {
    path: '',
    component: TodosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosPagePageRoutingModule {}

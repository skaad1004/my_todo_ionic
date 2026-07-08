import { NgModule } from '@angular/core';
import { TodosPagePage } from '../features/todos/pages/todos-page/todos-page.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    Tab1PageRoutingModule,
    TodosPagePage
  ]
})
export class Tab1PageModule {}

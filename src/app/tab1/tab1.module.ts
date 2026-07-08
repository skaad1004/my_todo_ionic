import { NgModule } from '@angular/core';
import { TodosPagePageModule } from '../features/todos/pages/todos-page/todos-page.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    Tab1PageRoutingModule,
    TodosPagePageModule
  ]
})
export class Tab1PageModule {}

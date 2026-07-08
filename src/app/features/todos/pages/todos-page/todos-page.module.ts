import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodosPagePageRoutingModule } from './todos-page-routing.module';

import { TodosPagePage } from './todos-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosPagePageRoutingModule
  ],
  declarations: [TodosPagePage]
})
export class TodosPagePageModule {}

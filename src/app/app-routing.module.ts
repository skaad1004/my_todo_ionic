import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'todos',
    // loadChildren: () => import('./features/todos/pages/todos/todos.module').then( m => m.TodosPageModule)
    loadChildren: () => import('./features/todos/pages/todos-page/todos-page.module').then( m => m.TodosPagePageModule)
  },
  {
    path: 'todos-page',
    loadChildren: () => import('./features/todos/pages/todos-page/todos-page.module').then( m => m.TodosPagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

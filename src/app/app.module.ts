import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireRemoteConfigModule, SETTINGS } from '@angular/fire/compat/remote-config';
import { CATEGORIES_REPOSITORY, TASKS_REPOSITORY } from './core/repositories/repository.tokens';
import { LocalStorageTasksRepository } from './core/repositories/local-storage-tasks.impl';
import { LocalStorageCategoryImpl } from './core/repositories/local-storage-category.impl';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireRemoteConfigModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SETTINGS,
      useValue: {
        minimumFetchIntervalMillis: isDevMode() ? 10000 : 3600000
      }
    },
    { provide: TASKS_REPOSITORY, useClass: LocalStorageTasksRepository },
    { provide: CATEGORIES_REPOSITORY, useClass: LocalStorageCategoryImpl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
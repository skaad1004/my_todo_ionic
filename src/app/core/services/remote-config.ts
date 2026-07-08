import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  constructor(private remoteConfig: AngularFireRemoteConfig) { }

  async init(): Promise<void> {
    await this.remoteConfig.fetchAndActivate();
  }

  getPriorityEnabled() {
    return this.remoteConfig.getBoolean('feature_todo_priority_enabled');
  }

  getPrioritySortEnabled() {
    return this.remoteConfig.getBoolean('feature_priority_sort_toggle_enabled');
  }

  getEmptyTitle() {
    return this.remoteConfig.getString('todo_empty_title');
  }
}
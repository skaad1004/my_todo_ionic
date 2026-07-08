import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  constructor(private remoteConfig: AngularFireRemoteConfig) {}

  async init(): Promise<boolean> {
    try {
      return await this.remoteConfig.fetchAndActivate();
    } catch {
      return false;
    }
  }

  getPrioritySortEnabled(): Promise<boolean> {
    return this.remoteConfig.getBoolean('feature_priority_sort_toggle_enabled');
  }
}
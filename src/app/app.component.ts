import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from './core/services/remote-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private remoteConfigService: RemoteConfigService) { }

  async ngOnInit(): Promise<void> {
    await this.remoteConfigService.init();
    console.log('priority sort enabled:', this.remoteConfigService.getPrioritySortEnabled());
  }
}
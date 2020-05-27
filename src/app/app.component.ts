import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'gigrum-app';

  constructor(
    private translateService: TranslateService
  ) {

  }
}

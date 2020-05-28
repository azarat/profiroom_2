import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  LocalizeRouterService
} from 'localize-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'gigrum-app';

  constructor(
    private translateService: TranslateService,
    private localize: LocalizeRouterService,
    private router: Router
  ) {


    // this.localize.changeLanguage('en');
    // this.translateService.setDefaultLang('en');

  }
  // ngOnInit() {
  //   console.log(this.router.url)
  //   if (!this.router.url.includes('/ru/') && !this.router.url.includes('/en/') ) {
  //     this.localize.changeLanguage('uk');
  //     this.translateService.setDefaultLang('uk');

  //   }
  // }
}

// http://localhost:4200/auth?expires=1590672864&id=58&signature=4e5f4025d46ce4bd6a129829f20ecf104ba0d2178bd2fec3c3a048df817ce2b5

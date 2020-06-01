import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  LocalizeRouterService
} from 'localize-router';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {
  title = 'gigrum-app';

  constructor(
    private translate: TranslateService,
    private localize: LocalizeRouterService,
    private router: Router
  ) {


    // this.localize.changeLanguage('en');
    // this.translateService.setDefaultLang('en');

  }
  ngOnInit() {
    this.translate.addLangs(['uk', 'ru']);
    this.translate.setDefaultLang('uk');

    const browserLang = this.translate.getBrowserLang();
    const lang = (browserLang.match(/uk|ru/)) ? browserLang : 'uk';

    const url = this.router.url;

    console.log(url);
    this.localize.changeLanguage(lang);
    }
  }

  // http://localhost:4200/auth?expires=1590672864&id=58&signature=4e5f4025d46ce4bd6a129829f20ecf104ba0d2178bd2fec3c3a048df817ce2b5

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
import { LocalStorageService } from './core/services/local-storage.service';

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
    private router: Router,
    private localStorageService: LocalStorageService
  ) {


    // this.localize.changeLanguage('en');
    // this.translateService.setDefaultLang('en');

  }
  ngOnInit() {

    const userLang = this.localStorageService.getItem('userLanguage').value;
    const url = this.router.url;
    if(userLang !== 'uk') {
      let translatedPath: any = this.localize.translateRoute('about/me');

      // do something with translated path
      // e.g. this.router.navigate([translatedPath]);
    }
    // const url = this.router.url;
    // if(url.match(/uk/)) {
    //   console.log('da')
    // }
    // this.translate.addLangs(['uk', 'ru']);
    // this.translate.setDefaultLang('uk');

    // const browserLang = this.translate.getBrowserLang();


    // // const lang = (browserLang.match(/uk|ru/)) ? browserLang : 'uk';



    // console.log(url);
    // // this.localize.changeLanguage('uk');
    }
  }

  // http://localhost:4200/auth?expires=1590672864&id=58&signature=4e5f4025d46ce4bd6a129829f20ecf104ba0d2178bd2fec3c3a048df817ce2b5

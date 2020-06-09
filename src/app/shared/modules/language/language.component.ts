import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public activeLang;
  public menuVisible: boolean = null;
  public languages = [{
      text: 'ru',
      code: 'ru'
    },
    {
      text: 'ua',
      code: 'uk'
    }
  ];

  constructor(
    public translate: TranslateService,
    private localize: LocalizeRouterService,
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private localStorageService: LocalStorageService

  ) {
    // this.translate.setDefaultLang('uk');
    const url = this._router.url;

    // console.log(url);
    this.activeLang = this.localize.parser.currentLang;
  }


  ngOnInit() {

    // this.activeLang = this.localize.parser.getLocationLang();
    // console.log(console.log(this.activeLang))
    // let locales = this.localize.parser.locales;

    // console.log(locales );
    // this.translate.setDefaultLang(cachedLanguage || languageOfBrowser || firstLanguageFromConfig);
  }

  public setLanguage(language: string) {
    // this.localStorageService.setItem('userLanguage', language);
    localStorage.setItem('userLanguage', language);
    this.localize.changeLanguage(language);
    this.activeLang = language;
    this.hideMenu();
  }

  public hideMenu() {
    this.menuVisible = false;
  }

  public showMenu() {
    if (this.menuVisible === null) {
      return this.menuVisible = true;
    }
    this.menuVisible = !this.menuVisible;
  }

}


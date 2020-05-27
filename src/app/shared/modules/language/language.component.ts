import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public activeLang;
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

  ) {
    this.translate.setDefaultLang('uk');
  }


  ngOnInit() {

    this.activeLang = this.localize.parser.getLocationLang();
    console.log(console.log(this.activeLang))
    // let locales = this.localize.parser.locales;

    // console.log(locales );
    // this.translate.setDefaultLang(cachedLanguage || languageOfBrowser || firstLanguageFromConfig);
  }

  setLanguage(language: string) {
    this.localize.changeLanguage(language);
  }

}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseInterceptor } from './interceptors/base-interceptor';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import {LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings, ManualParserLoader} from 'localize-router';
import { appRoutes } from '../app-routing.module';
import {Location} from '@angular/common';
import {LocalizeRouterHttpLoader} from 'localize-router-http-loader';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthentificationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { UnauthorisatedGuard } from './guards/unauthorisated.guard';
import { WindowScrollBlockService } from './services/window-scrolling.service';

import { config } from 'process';

import { AuthorisatedGuard } from './guards/authorisated.guard';
import { OffersService } from './services/offers.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CategoriesListService } from './services/categories.service';
import { CustomLocalizeService } from './services/custom-localize.service';

export const url = new URL(location.href).origin;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
          deps: [HttpClient],
      },

      // useDefaultLang: true
      }
    ),
    LocalizeRouterModule.forRoot(appRoutes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
          new ManualParserLoader(translate, location, settings, ['uk', 'ru'], ''),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient, ],
      },
      // defaultLangFunction: (
      //   languages: ['uk', 'ru']) => 'uk'
        // {
          // const userLang = localStorage.getItem('userLanguage');
          // if (userLang == null  ) {
          //   console.log(null);
          //   return 'uk';
          // } else {
          //   console.log(userLang);
          //   return 'ru';
          // }
        // },
      // alwaysSetPrefix: false,

    }),
    ScrollToModule.forRoot()
  ],
  providers: [
    CustomLocalizeService,
    OffersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    AuthentificationService,
    UserService,
    LocalStorageService,
    UnauthorisatedGuard,
    AuthorisatedGuard,
    CategoriesListService,
    WindowScrollBlockService,
  ]
})
export class CoreModule { }


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, url + '/assets/i18n/', '.json');
}

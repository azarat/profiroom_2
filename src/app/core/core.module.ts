import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseInterceptor } from './interceptors/base-interceptor';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from 'localize-router';
import { routes } from '../app-routing.module';
import {Location} from '@angular/common';
import {LocalizeRouterHttpLoader} from 'localize-router-http-loader';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthentificationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { UnauthorisatedGuard } from './guards/unauthorisated.guard';
import { AngularFireModule } from '@angular/fire';
import { config } from 'process';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthorisatedGuard } from './guards/authorisated.guard';
import { CategorysListService } from './services/get-categorys.service';
import { GetOffersService } from './services/get-offers.service';

export const url = new URL(location.href).origin;

const gConfig = {
  apiKey: 'AIzaSyCvUM_cRxpUTglNwMUcIFQdVsTtfLzIBtw',
    authDomain: 'gigrum-6bd12.firebaseapp.com',
    databaseURL: 'https://gigrum-6bd12.firebaseio.com',
    projectId: 'gigrum-6bd12',
    storageBucket: '',
    messagingSenderId: '525258845420',
    appId: '1:525258845420:web:635bceff56889f8ce949c9',
    measurementId: 'G-4GNMQ0XZDM'
};

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
        deps: [HttpClient]
      }
    }
    ),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) =>
            new LocalizeRouterHttpLoader(translate, location, settings, http, url + '/assets/locales.json'),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    AngularFireModule.initializeApp(gConfig),
    AngularFireAuthModule
  ],
  providers: [
    GetOffersService,
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
    CategorysListService,
    
  ]
})
export class CoreModule { }


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, url + '/assets/i18n/', '.json');
}

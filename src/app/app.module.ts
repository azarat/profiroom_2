import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomePageModule } from './home-page/home-page.module';
import { CatalogPageModule } from './catalog-page/catalog-page.module';
import { CategoriesListModule } from './categories-list/categories-list.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { LocalizeRouterModule } from 'localize-router';
import {Location} from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from './shared/modules/language/language.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { AuthorizationPageModule } from './authorization-page/authorization-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CategoryResolverr } from './catalog-page/services/category.resolve';
// import { CategoryResolveR } from './catalog-page/services/category.resolve';
// import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // shareds
    // RouterModule,
    // LocalizeRouterModule,
    // created
    // HomePageModule,
    // CatalogPageModule,
    // DashboardPageModule,
    // ErrorPageModule,
    // AuthorizationPageModule,
    // TranslateModule,
  ],
  providers: [
    // CategoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

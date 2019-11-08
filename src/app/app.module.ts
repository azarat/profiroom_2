import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { NgxGalleryModule } from 'ngx-gallery';

import 'reflect-metadata';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgxGalleryModule
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
  exports: [
    // NgxGalleryModule
  ],
  providers: [
    // CategoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

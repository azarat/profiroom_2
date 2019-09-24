import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './home-page/home-page.module';
import { CatalogPageModule } from './catalog-page/catalog-page.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomePageModule,
    CatalogPageModule,
    DashboardPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

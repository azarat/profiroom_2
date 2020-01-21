import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'reflect-metadata';
import { FormsModule } from '@angular/forms';
import { SocketService } from './chat/services/socket.service';

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
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

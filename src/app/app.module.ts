import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule, appRoutes } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'reflect-metadata';
import { FormsModule } from '@angular/forms';
import { SocketService } from './core/services/socket.service';

import { SystemMessagesService } from './shared/modules/system-messages/services/system-messages.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from './shared/modules/language/language.module';


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
    TranslateModule,
    LocalizeRouterModule.forChild(appRoutes),
    LanguageModule

  ],
  exports: [
  ],
  providers: [
    SocketService,
    SystemMessagesService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

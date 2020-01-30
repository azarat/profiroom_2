import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '../language/language.module';
import { UserHeaderMenuModule } from '../user-header-menu/user-header-menu.module';



@NgModule({
  declarations: [
    MainHeaderComponent,
  ],
  exports: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocalizeRouterModule,
    TranslateModule,
    LanguageModule,
    UserHeaderMenuModule
  ]
})
export class MainHeaderModule { }

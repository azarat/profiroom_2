import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHeaderComponent } from './categories-header.component';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CategoriesHeaderComponent
  ],
  exports: [
    CategoriesHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocalizeRouterModule,
    HttpClientModule,
    // TranslateModule,
    // LanguageModule
  ]
})
export class CategoriesHeaderModule { }

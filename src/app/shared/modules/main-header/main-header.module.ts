import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  exports: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocalizeRouterModule
  ]
})
export class MainHeaderModule { }

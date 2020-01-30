import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderMenuComponent } from './user-header-menu.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserHeaderMenuComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    RouterModule,
  ],
  exports: [
    UserHeaderMenuComponent
  ]
})
export class UserHeaderMenuModule { }

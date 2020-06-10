import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderMenuComponent } from './user-header-menu.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [UserHeaderMenuComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    TranslateModule,
    RouterModule,
    ClickOutsideModule,
  ],
  exports: [
    UserHeaderMenuComponent
  ]
})
export class UserHeaderMenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCommentsComponent } from './users-comments.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [UsersCommentsComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    RouterModule,
    ClickOutsideModule
  ],
  exports: [
    UsersCommentsComponent
  ]
})
export class UsersCommentsModule { }

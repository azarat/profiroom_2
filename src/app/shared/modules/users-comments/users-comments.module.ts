import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCommentsComponent } from './users-comments.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [UsersCommentsComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    TranslateModule,
    RouterModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UsersCommentsComponent
  ]
})
export class UsersCommentsModule { }

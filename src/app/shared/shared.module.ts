import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalizeRouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    LocalizeRouterModule
  ]
})
export class SharedModule { }

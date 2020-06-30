import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),

    MainHeaderModule
  ],
  exports: [
    ErrorPageComponent
  ]
})
export class ErrorPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './authorization-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationPageComponent
  }
];

@NgModule({
  declarations: [AuthorizationPageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
  ],
  exports: [
    AuthorizationPageComponent
  ]
})
export class AuthorizationPageModule { }

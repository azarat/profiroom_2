import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './authorization-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHideInputDirective } from './login-page/show-hide-inputs';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationPageComponent
  }
];


@NgModule({
  declarations: [
    AuthorizationPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ShowHideInputDirective
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    AuthorizationPageComponent
  ]
})
export class AuthorizationPageModule { }

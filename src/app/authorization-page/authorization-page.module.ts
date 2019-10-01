import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './authorization-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatFormFieldControl, MatIconModule } from '@angular/material';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MainHeaderComponent } from '../shared/modules/main-header/main-header.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { LanguageModule } from '../shared/modules/language/language.module';
import { InformPopupModule } from '../shared/modules/inform-popup/inform-popup.module';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationPageComponent
  },
  {
    path: 'reset-pass'
  }
];


@NgModule({
  declarations: [
    AuthorizationPageComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,

    // created
    LanguageModule,
    MainHeaderModule,
    InformPopupModule

  ],
  exports: [
    AuthorizationPageComponent
  ]
})
export class AuthorizationPageModule { }

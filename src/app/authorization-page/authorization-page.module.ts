import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatFormFieldControl, MatIconModule } from '@angular/material';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MainHeaderComponent } from '../shared/modules/main-header/main-header.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { LanguageModule } from '../shared/modules/language/language.module';
import { InformPopupModule } from '../shared/modules/inform-popup/inform-popup.module';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { AuthentificationPageComponent } from './authentification-page/authentification-page.component';
import { LoginPageComponent } from './authentification-page/login-page/login-page.component';
import { RegistrationPageComponent } from './authentification-page/registration-page/registration-page.component';
import { SetNewPassComponent } from './set-new-pass/set-new-pass.component';
import { PassResetGuard } from '../core/guards/pass-reset.guard';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AuthentificationPageComponent
  },
  {
    path: 'reset-pass',
    component: ResetPasswordPageComponent
  },
  {
    path: 'new-pass',
    canActivateChild: [PassResetGuard],
    component: SetNewPassComponent
  }


];


@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    ResetPasswordPageComponent,
    AuthentificationPageComponent,
    SetNewPassComponent,

    //directives

  ],
  imports: [
    CommonModule,
    LanguageModule,
    LocalizeRouterModule.forChild(routes),
    TranslateModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    SocialLoginModule,

    // created

    MainHeaderModule,
    InformPopupModule,



  ],
  exports: [
    ResetPasswordPageComponent,
    AuthentificationPageComponent
  ],
  providers: [
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // }
  ]
})
export class AuthorizationPageModule { }

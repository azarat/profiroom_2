import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MainHeaderComponent } from '../shared/modules/main-header/main-header.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { LanguageModule } from '../shared/modules/language/language.module';
import { InformPopupModule } from '../shared/modules/inform-popup/inform-popup.module';


import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { AuthentificationPageComponent } from './authentification-page/authentification-page.component';
import { LoginPageComponent } from './authentification-page/login-page/login-page.component';
import { RegistrationPageComponent } from './authentification-page/registration-page/registration-page.component';
import { SetNewPassComponent } from './set-new-pass/set-new-pass.component';
import { PassResetGuard } from '../core/guards/pass-reset.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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

// const socialConfig = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('525258845420-q37hm7hqfvct3sm379nl7eisl9ock8tm.apps.googleusercontent.com')
//   },
//   // {
//   //   id: FacebookLoginProvider.PROVIDER_ID,
//   //   provider: new FacebookLoginProvider('Facebook-App-Id')
//   // }
// ]);

// export function provideConfig() {
//   return socialConfig;
// }


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
    InformPopupModule,



  ],
  exports: [
    ResetPasswordPageComponent,
    AuthentificationPageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // }
  ]
})
export class AuthorizationPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserSettingsComponent } from './components/home-user-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatTabsModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { GeneralUserSettingsComponent } from './components/general-user-settings/general-user-settings.component';
import { MainUserSettingsComponent } from './components/general-user-settings/main-user-settings/main-user-settings.component';
import { BirthdayUserSettingsComponent } from './components/general-user-settings/birthday-user-settings/birthday-user-settings.component';
import { LocationLanguageUserSettingsComponent } from './components/general-user-settings/location-language-user-settings/location-language-user-settings.component';
import { EducationUserSettingsComponent } from './components/general-user-settings/education-user-settings/education-user-settings.component';
import { AdditionalEducationUserSettingsComponent } from './components/general-user-settings/additional-education-user-settings/additional-education-user-settings.component';
import { NotificationsUserSettingsComponent } from './components/notifications-user-settings/notifications-user-settings.component';

const servicesRoutes: Routes = [
  {
    path: '',
    component: HomeUserSettingsComponent,
  },

];

@NgModule({
  declarations: [HomeUserSettingsComponent, GeneralUserSettingsComponent, MainUserSettingsComponent, BirthdayUserSettingsComponent, LocationLanguageUserSettingsComponent, EducationUserSettingsComponent, AdditionalEducationUserSettingsComponent, NotificationsUserSettingsComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
    FormsModule,
    ReactiveFormsModule,

    // -----matherials
    MatTabsModule,
    MatSelectModule
  ]
})
export class UserSettingsDashboardModule { }

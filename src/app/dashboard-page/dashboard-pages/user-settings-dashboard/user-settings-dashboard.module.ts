import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsDashboardComponent } from './components/user-settings-dashboard/user-settings-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatTabsModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { GeneralUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/general-user-settings.component';
import { MainUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/main-user-settings/main-user-settings.component';
import { BirthdayUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/birthday-user-settings/birthday-user-settings.component';
import { LocationLanguageUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/location-language-user-settings/location-language-user-settings.component';
import { EducationUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/education-user-settings/education-user-settings.component';
import { AdditionalEducationUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/additional-education-user-settings/additional-education-user-settings.component';

const servicesRoutes: Routes = [
  {
    path: '',
    component: UserSettingsDashboardComponent,
  },

];

@NgModule({
  declarations: [UserSettingsDashboardComponent, GeneralUserSettingsComponent, MainUserSettingsComponent, BirthdayUserSettingsComponent, LocationLanguageUserSettingsComponent, EducationUserSettingsComponent, AdditionalEducationUserSettingsComponent],
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

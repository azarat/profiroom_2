import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsDashboardComponent } from './components/user-settings-dashboard/user-settings-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { GeneralUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/general-user-settings.component';
import { MainUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/main-user-settings/main-user-settings.component';
import { BirthdayUserSettingsComponent } from './components/user-settings-dashboard/general-user-settings/birthday-user-settings/birthday-user-settings.component';

const servicesRoutes: Routes = [
  {
    path: '',
    component: UserSettingsDashboardComponent,
  },

];

@NgModule({
  declarations: [UserSettingsDashboardComponent, GeneralUserSettingsComponent, MainUserSettingsComponent, BirthdayUserSettingsComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
    FormsModule,
    ReactiveFormsModule,

    // -----matherials
    MatTabsModule
  ]
})
export class UserSettingsDashboardModule { }

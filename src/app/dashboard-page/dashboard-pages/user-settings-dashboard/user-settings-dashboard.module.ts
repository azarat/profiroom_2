import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsDashboardComponent } from './components/user-settings-dashboard/user-settings-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { UserSettingsDashboardMainComponent } from './components/user-settings-dashboard/user-settings-dashboard-main/user-settings-dashboard-main.component';

const servicesRoutes: Routes = [
  {
    path: '',
    component: UserSettingsDashboardComponent,
  },

];

@NgModule({
  declarations: [UserSettingsDashboardComponent, UserSettingsDashboardMainComponent],
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

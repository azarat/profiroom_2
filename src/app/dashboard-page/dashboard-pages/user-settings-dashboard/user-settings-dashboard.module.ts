import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsDashboardComponent } from './components/user-settings-dashboard/user-settings-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

const servicesRoutes: Routes = [
  {
    path: '',
    component: UserSettingsDashboardComponent,
  },

];

@NgModule({
  declarations: [UserSettingsDashboardComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
  ]
})
export class UserSettingsDashboardModule { }

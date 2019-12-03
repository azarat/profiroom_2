import { NgModule } from '@angular/core';
import { HomeDashboardComponent } from './home-dashboard.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';


const dashboardPageRoutes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
  }
];

@NgModule({
  declarations: [
    HomeDashboardComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(dashboardPageRoutes),
    RouterModule.forChild(dashboardPageRoutes),
    // MatSlideToggleModule,
    // MatIconModule,
    // MatBadgeModule,

  ],
  exports: [
  ]
})
export class HomeDashboardPageModule { }

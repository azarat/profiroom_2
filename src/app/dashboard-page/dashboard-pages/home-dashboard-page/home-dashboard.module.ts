import { NgModule } from '@angular/core';
import { HomeDashboardComponent } from './home-dashboard.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartDashboardComponent } from './line-chart-dashboard/line-chart-dashboard.component';
import { PieChartDashboardComponent } from './pie-chart-dashboard/pie-chart-dashboard.component';


const dashboardPageRoutes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
  }
];

@NgModule({
  declarations: [
    HomeDashboardComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    LineChartDashboardComponent,
    PieChartDashboardComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(dashboardPageRoutes),
    RouterModule.forChild(dashboardPageRoutes),
    // MatSlideToggleModule,
    // MatIconModule,
    // MatBadgeModule,
    ChartsModule,
  ],
  exports: [
  ]
})
export class HomeDashboardPageModule { }

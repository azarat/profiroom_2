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
import { UsersCommentsModule } from 'src/app/shared/modules/users-comments/users-comments.module';
import { FreelacerAchivesComponent } from './freelacer-achives/freelacer-achives.component';
import { ThousandSeparatorModule } from 'src/app/shared/pipes/thousand-separator/thousand-separator.module';



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
    FreelacerAchivesComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(dashboardPageRoutes),
    RouterModule.forChild(dashboardPageRoutes),
    // MatSlideToggleModule,
    // MatIconModule,
    // MatBadgeModule,
    ChartsModule,
    UsersCommentsModule,
    ThousandSeparatorModule,

  ],
  exports: [
  ]
})
export class HomeDashboardPageModule { }

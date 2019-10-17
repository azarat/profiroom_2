import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { HomeDashboardComponent } from './dashboard-pages/home-dashboard/home-dashboard.component';
import { MatSelectModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        component: HomeDashboardComponent
      },
      {
        path: 'my-services',
        loadChildren: () =>
        import('./dashboard-pages/my-services-dashboard/my-services-dashboard.module').then(m => m.MyServicesDashboardModule)
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardPageComponent,
    HomeDashboardComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatIconModule,
    MatBadgeModule,

  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }

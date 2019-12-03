import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { HomeDashboardComponent } from './dashboard-pages/home-dashboard-page/home-dashboard.component';
import { MatSelectModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard-pages/home-dashboard-page/home-dashboard.module').then(m => m.HomeDashboardPageModule)
        // component: HomeDashboardComponent
      },
      {
        path: 'my-services',
        loadChildren: () =>
        import('./dashboard-pages/my-services-dashboard/my-services-dashboard.module').then(m => m.MyServicesDashboardModule)
      },
      {
        path: 'chat-room',
        loadChildren: () => import('./dashboard-pages/chat-page/chat-page.module').then(m => m.ChatPageModule)
        // import('./dashboard-pages/my-services-dashboard/my-services-dashboard.module').then(m => m.MyServicesDashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () =>import('./dashboard-pages/user-settings-dashboard/user-settings-dashboard.module')
        .then(m => m.UserSettingsDashboardModule)
      }

    ]
  }
];

@NgModule({
  declarations: [DashboardPageComponent,
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

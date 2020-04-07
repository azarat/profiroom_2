import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HomeDashboardComponent } from './dashboard-pages/home-dashboard-page/home-dashboard.component';
import { MatSelectModule } from '@angular/material';
import { StarRaitingModule } from '../shared/modules/star-raiting/star-raiting.module';
import { SystemMessagesModule } from '../shared/modules/system-messages/system-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('./dashboard-pages/home-dashboard-page/home-dashboard.module').then(m => m.HomeDashboardPageModule)
        // component: HomeDashboardComponent
      },
      {
        path: 'projects',
        loadChildren: () => import('./dashboard-pages/projects-page/projects-page.module').then(m => m.ProjectsPageModule)
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
        path: 'finance',
        loadChildren: () => import('./dashboard-pages/finace-page/finace-page.module').then(m => m.FinacePageModule)
        // import('./dashboard-pages/my-services-dashboard/my-services-dashboard.module').then(m => m.MyServicesDashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./dashboard-pages/user-settings-dashboard/user-settings-dashboard.module')
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
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatBadgeModule,

    StarRaitingModule,
    SystemMessagesModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }

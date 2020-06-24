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
import { StarRatingModule } from '../shared/modules/star-rating/star-rating.module';
import { SystemMessagesModule } from '../shared/modules/system-messages/system-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '../shared/modules/language/language.module';
import { ClickOutsideModule } from 'ng-click-outside';


const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    // pathMatch: 'full',
    children: [
      {
        path: '',
        // pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        // pathMatch: 'full',
        loadChildren: () => import('./dashboard-pages/home-dashboard-page/home-dashboard.module').then(m => m.HomeDashboardPageModule)
      },
      {
        path: 'projects',
        // pathMatch: 'full',
        loadChildren: () => import('./dashboard-pages/projects-page/projects-page.module').then(m => m.ProjectsPageModule)
      },
      {
        path: 'my-services',
        loadChildren: () =>
          import('./dashboard-pages/my-services-dashboard/my-services-dashboard.module').then(m => m.MyServicesDashboardModule)
      },
      {
        path: 'chat-room',
        // pathMatch: 'full',
        loadChildren: () => import('./dashboard-pages/chat-page/chat-page.module').then(m => m.ChatPageModule)
      },
      {
        path: 'finance',
        loadChildren: () => import('./dashboard-pages/finance-page/finance.module').then(m => m.FinancePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./dashboard-pages/user-settings-dashboard/user-settings-dashboard.module')
          .then(m => m.UserSettingsDashboardModule)
      },
      {
        path: 'arbitration',
        loadChildren: () => import('./dashboard-pages/arbitration-page/arbitration-page.module').then(m => m.ArbitrationPageModule)
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardPageComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(dashboardRoutes),
    TranslateModule,
    RouterModule.forChild(dashboardRoutes),
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    LanguageModule,

    MatIconModule,
    MatBadgeModule,

    ClickOutsideModule,
    StarRatingModule,
    SystemMessagesModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }

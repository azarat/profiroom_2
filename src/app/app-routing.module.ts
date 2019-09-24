import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () => import('./authorization-page/authorization-page.module').then(m => m.AuthorizationPageModule)
  },
  {
    path: 'catalog',
    pathMatch: 'prefix',
    loadChildren: () => import('./service-page/service-page.module').then(m => m.ServicePageModule)
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    loadChildren: () => import('./dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
    component: ErrorPageComponent,
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}

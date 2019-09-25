import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog-page/catalog-page.module').then(m => m.CatalogPageModule)

  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () => import('./authorization-page/authorization-page.module').then(m => m.AuthorizationPageModule)
  },
  {
    path: 'service',
    pathMatch: 'prefix',
    loadChildren: () => import('./service-page/service-page.module').then(m => m.ServicePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
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

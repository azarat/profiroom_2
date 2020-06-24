import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorisatedGuard } from './core/guards/unauthorisated.guard';
import { AuthorisatedGuard } from './core/guards/authorisated.guard';
import { LocalizeRouterModule } from 'localize-router';



export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog-page/catalog-page.module').then(m => m.CatalogPageModule)
  },
  {
    path: 'auth',
    canActivateChild: [AuthorisatedGuard],
    pathMatch: 'prefix',
    loadChildren: () => import('./authorization-page/authorization-page.module').then(m => m.AuthorizationPageModule)
  },
  {
    path: 'service',
    pathMatch: 'prefix',
    loadChildren: () => import('./service-page/service-page.module').then(m => m.ServicePageModule)
  },
  {
    path: 'dashboard',
    canActivateChild: [UnauthorisatedGuard],
    loadChildren: () => import('./dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  },
  {
    path: '404',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule)
  }

];

@NgModule({
  imports: [
    // LocalizeRouterModule.forChild(routes),
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}

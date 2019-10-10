import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { UnauthorisatedGuard } from './core/guards/unauthorisated.guard';
import { AuthorisatedGuard } from './core/guards/authorisated.guard';
import { CategoryResolver } from './catalog-page/services/category.resolve';



export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('./categories-list/categories-list.module').then(m => m.CategoriesListModule)
  },
  {
    path: 'catalog2',
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

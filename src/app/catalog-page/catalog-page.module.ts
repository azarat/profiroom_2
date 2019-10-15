import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { HttpClientModule } from '@angular/common/http';
import { CategorysFilterComponent } from './categorys-filter/categorys-filter.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { CategoryResolverr } from './services/category.resolve';
import { CategoryPageComponent } from './category-page/category-page.component';


const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
    // redirectTo: '/catalog/:category',
    // resolve: { items: CategoryResolverr }
  },
  {
    path: ':category/:subcategory',
    component: CategoryPageComponent,
    // resolve: { items: CategoryResolverr },
    // loadChildren: () => import('./category-page/category-page.module').then(m => m.CategoryPageModule)

  }
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CategorysFilterComponent,
    CategoryPageComponent,
    ItemsListComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    HttpClientModule
  ],
  exports: [
    CatalogPageComponent
  ],
  providers: [
    CategoryResolverr
  ]
})
export class CatalogPageModule { }

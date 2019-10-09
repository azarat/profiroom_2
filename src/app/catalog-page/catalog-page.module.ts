import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategorysFilterComponent } from './categorys-filter/categorys-filter.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { CategoryResolver } from './services/category.resolve';


const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
  },
  {
    path: 'category/:category',
    component: CategoryListComponent,
    resolve: { items: CategoryResolver }
    // loadChildren: () => import('./category-list/category-list.module').then(m => m.CategoryListModule)

  }
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CategorysFilterComponent,
    ItemsListComponent,
    CategoryListComponent
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
    CategoryResolver
  ]
})
export class CatalogPageModule { }

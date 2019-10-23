import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router/src/localize-router.module';

import { CategoriesCatalogComponent } from './categories-catalog/categories-catalog.component';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';

import { CategoryResolver } from './resolves/categories.resolve';
import { SubCategoryResolver } from './resolves/subcategory.resolve';
import { FilterComponent } from './catalog/filter/filter.component';
import { ItemsComponent } from './catalog/items/items.component';
import { GetOffersService } from './services/get-offers.service';
import { GetSubCategoryService } from './services/get-subcategorys.service';
import { BaseInterceptor } from '../core/interceptors/base-interceptor';


import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogHomeComponent,
  },
  {
    path: ':category',
    component: CategoriesCatalogComponent,
    resolve: { items: CategoryResolver },
    // children: [
    //   {
    //     path: ':subcategorie',
    //     resolve: { items: SubCategoryResolver },
    //     component: SubcategorieComponent
    //   }
    // ]
  },

  {
    path: ':category/:subcategorie',
    component: CatalogComponent,
    resolve: { items: CategoryResolver },
    // loadChildren: () => import('./category-page/category-page.module').then(m => m.CategoryPageModule)
  }
];

@NgModule({
  declarations: [
    CategoriesCatalogComponent,
    CatalogComponent,
    CatalogHomeComponent,
    FilterComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    // HttpClient
  ],
  exports: [
    CatalogHomeComponent
  ],
  providers: [
    GetOffersService,
    CategoryResolver,
    SubCategoryResolver,
    OffersResolver,
    GetSubCategoryService
  ]
})
export class CatalogPageModule { }

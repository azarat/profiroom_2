import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router/src/localize-router.module';

import { CategoriesCatalogPageComponent } from './categories-catalog-page/categories-catalog-page.component';
import { CatalogHomePageComponent } from './catalog-home-page/catalog-home-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';

import { CategoriesResolver } from './resolves/categories.resolve';
import { FilterComponent } from './catalog/catalog-filter/catalog-filter.component';
import { ItemsComponent } from './catalog/catalog-items/catalog-items.component';
import { GetOffersService } from './services/get-offers.service';
import { GetCategoryItemsService } from './services/get-category-items.service';
import { BaseInterceptor } from '../core/interceptors/base-interceptor';


import { HttpClient } from '@angular/common/http';
import { OffersResolver } from './resolves/offers.resolve';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { CategoriesListService } from '../core/services/categories.service';
import { CatalogPaginationComponent } from './catalog/catalog-pagination/catalog-pagination.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogHomePageComponent,
  },
  {
    path: ':category',
    component: CategoriesCatalogPageComponent,
    resolve: { items: CategoriesResolver },
  },
  {
    path: ':category/:subCategory',
    component: CatalogComponent,
    resolve: { items: OffersResolver },
  }
];

@NgModule({
  declarations: [
    CategoriesCatalogPageComponent,
    CatalogComponent,
    CatalogHomePageComponent,
    FilterComponent,
    ItemsComponent,
    CatalogPaginationComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    CatalogHomePageComponent
  ],
  providers: [
    GetOffersService,
    CategoriesResolver,
    OffersResolver,
    GetCategoryItemsService,
    CategoriesListService
  ]
})
export class CatalogPageModule { }

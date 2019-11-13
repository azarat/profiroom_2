import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router/src/localize-router.module';

import { CategorysCatalogPageComponent } from './categorys-catalog-page/categorys-catalog-page.component';
import { CatalogHomePageComponent } from './catalog-home-page/catalog-home-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';

import { CategorysResolver } from './resolves/categorys.resolve';
import { FilterComponent } from './catalog/catalog-filter/catalog-filter.component';
import { ItemsComponent } from './catalog/catalog-items/catalog-items.component';
import { GetOffersService } from './services/get-offers.service';
import { GetCategorieItemsService } from './services/get-categorie-items.service';
import { BaseInterceptor } from '../core/interceptors/base-interceptor';


import { HttpClient } from '@angular/common/http';
import { OffersResolver } from './resolves/offers.resolve';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { CategorysListService } from '../core/services/categorys.service';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogHomePageComponent,
  },
  {
    path: ':category',
    component: CategorysCatalogPageComponent,
    resolve: { items: CategorysResolver },
  },
  {
    path: ':category/:subcategorie',
    component: CatalogComponent,
    resolve: { items: OffersResolver },
  }
];

@NgModule({
  declarations: [
    CategorysCatalogPageComponent,
    CatalogComponent,
    CatalogHomePageComponent,
    FilterComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    FormsModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    CatalogHomePageComponent
  ],
  providers: [
    GetOffersService,
    CategorysResolver,
    OffersResolver,
    GetCategorieItemsService,
    CategorysListService
  ]
})
export class CatalogPageModule { }

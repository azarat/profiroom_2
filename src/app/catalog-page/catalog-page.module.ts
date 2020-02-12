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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CategorysListService } from '../core/services/categorys.service';
import { CatalogPaginationComponent } from './catalog/catalog-pagination/catalog-pagination.component';
import { TranslateModule } from '@ngx-translate/core';



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
    path: ':category/:subCategory',
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
    CatalogPaginationComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    FormsModule,
    ReactiveFormsModule,
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
    CategorysResolver,
    OffersResolver,
    GetCategorieItemsService,
    CategorysListService
  ]
})
export class CatalogPageModule { }

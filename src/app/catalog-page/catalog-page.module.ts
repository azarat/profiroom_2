import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router/src/localize-router.module';
import { HttpClientModule } from '@angular/common/http';

import { CategoriesCatalogComponent } from './categories-catalog/categories-catalog.component';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';

import { CategoryResolver } from './resolves/categories.resolve';
import { SubCategoryResolver } from './resolves/subcategory.resolve';
import { OffersResolver } from './resolves/offers.resolve';
import { FilterComponent } from './catalog/filter/filter.component';
import { ItemsComponent } from './catalog/items/items.component';
import { GetOffersService } from '../core/services/get-offers.service';

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
    resolve: { items: OffersResolver },
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
    HttpClientModule,
    CategoriesHeaderModule
  ],
  exports: [
    CatalogHomeComponent
  ],
  providers: [
    CategoryResolver,
    SubCategoryResolver,
    OffersResolver,
    GetOffersService
  ]
})
export class CatalogPageModule { }

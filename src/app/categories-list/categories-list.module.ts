import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoriesListComponent } from './subcategories-list/subcategories-list.component';
import { SubcategorieComponent } from './subcategorie/subcategorie.component';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';
import { CategoriesListComponent } from './categories-list.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router/src/localize-router.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryResolver } from './resolves/categories.resolve';
import { SubCategoryResolver } from './resolves/subcategory.resolve';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
  },
  {
    path: ':category',
    component: SubcategoriesListComponent,
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
    component: SubcategorieComponent,
    resolve: { items: CategoryResolver },
    // loadChildren: () => import('./category-page/category-page.module').then(m => m.CategoryPageModule)
  }
];

@NgModule({
  declarations: [
    SubcategoriesListComponent,
    SubcategorieComponent,
    CategoriesListComponent,
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
    CategoriesListComponent
  ],
  providers: [
    CategoryResolver,
    SubCategoryResolver
  ]
})
export class CategoriesListModule { }

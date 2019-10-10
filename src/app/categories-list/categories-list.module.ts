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
import { CategoryResolver } from './services/categories.resolve';
import { SubCategoryResolver } from './services/subcategory.resolve';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
    path: ':category/:subcategory',
    resolve: { items: SubCategoryResolver },
    component: SubcategorieComponent
  }
  // {
  //   path: '',
  //   component: CategoriesListComponent,
  //   pathMatch: 'full',
  //   children: [
  //     {
  //       path: ':category',
  //       pathMatch: 'full',
  //       resolve: { items: CategoryResolver },
  //       component: SubcategoriesListComponent,
  //       children: [
  //         {
  //           path: ':subcategory',
  //           pathMatch: 'full',
  //           resolve: { items: SubCategoryResolver },
  //           component: SubcategorieComponent
  //         }
  //     ]
  //     }
  //   ]
  //   // resolve: { items: CategoryResolver },
  //   // loadChildren: () => import('./category-page/category-page.module').then(m => m.CategoryPageModule)
  // }
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
    HttpClientModule
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

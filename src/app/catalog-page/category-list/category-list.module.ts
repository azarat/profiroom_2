import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { categoryRoutes } from './category.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forRoot(categoryRoutes),
    // RouterModule.forChild(categoryRoutes),
  ]
})
export class CategoryListModule { }

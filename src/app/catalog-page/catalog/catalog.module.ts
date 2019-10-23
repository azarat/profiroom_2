import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ItemsComponent } from './items/items.component';
import { CatalogComponent } from './catalog.component';
import { CategoriesHeaderComponent } from 'src/app/shared/modules/categories-header/categories-header.component';
import { MainHeaderComponent } from 'src/app/shared/modules/main-header/main-header.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CatalogComponent,
    FilterComponent,
    ItemsComponent,
    CategoriesHeaderComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CatalogModule { }

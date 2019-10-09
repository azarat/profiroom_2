import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list.component';


export const categoryRoutes: Routes = [
  {
    path: 'design',
    component: CategoryListComponent
  },
  {
    path: 'gavno',
    component: CategoryListComponent
  }
];



import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GetCategoryItemsService } from '../services/get-category-items.service';
import { SubCategoryListInterface } from 'src/app/shared/interfaces/subcategories-list.interface';

@Injectable()

export class CategoriesResolver implements Resolve<any> {
  category: SubCategoryListInterface  ;
  constructor(
    private aPiService: GetCategoryItemsService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.aPiService.getCategoryItems(route.params.category);

  }
}


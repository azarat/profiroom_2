import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GetCategorieItemsService } from '../services/get-categorie-items.service';
import { SubCategoryListInterface } from 'src/app/shared/interfaces/subcategories-list.interface';

@Injectable()

export class CategorysResolver implements Resolve<any> {
  category: SubCategoryListInterface  ;
  constructor(
    private aPiService: GetCategorieItemsService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.aPiService.getCategorieItems(route.params.category);

  }
}


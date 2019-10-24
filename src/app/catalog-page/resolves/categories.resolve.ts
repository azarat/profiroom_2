import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FreelancersListService } from '../services/freelancers-list.service';
import { GetSubCategoryService } from '../services/get-subcategorys.service';
import { SubCategoryListInterface } from 'src/app/shared/interfaces/subcategories-list.interface';

@Injectable()

export class CategoryResolver implements Resolve<any> {
  category: SubCategoryListInterface  ;
  constructor(
    private aPiService: GetSubCategoryService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.params);
    this.aPiService.getSubCategorys(route.params.category);

  }
}


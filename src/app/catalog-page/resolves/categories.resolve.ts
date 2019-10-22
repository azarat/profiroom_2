import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FreelancersListService } from '../services/freelancers-list.service';
import { CategorysListService } from '../../core/services/get-categorys.service';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';

@Injectable()

export class CategoryResolver implements Resolve<any> {
  category: CategoryListInterface ;
  constructor(
    private aPiService: CategorysListService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.params);
    this.aPiService.getSubCategorys(route.params.category);
  }
}


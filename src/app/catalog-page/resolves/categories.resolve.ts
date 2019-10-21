import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FreelancersListService } from '../services/freelancers-list.service';
import { CategorysListService, SubCategorysListInterface  } from 'src/app/core/services/get-categorys.service';

@Injectable()

export class CategoryResolver implements Resolve<any> {
  category: SubCategorysListInterface ;
  constructor(
    private aPiService: CategorysListService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.params);
    this.aPiService.getSubCategorys(route.params.category);

  }
}


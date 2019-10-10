import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FreelancersListService } from './freelancers-list.service';

@Injectable()

export class SubCategoryResolver implements Resolve<any> {
  category: string;
  constructor(
    private aPiService: FreelancersListService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params);
    this.aPiService.getCategoryData(route.params.subcategory);
  }
}

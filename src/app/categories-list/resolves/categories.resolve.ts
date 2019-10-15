import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FreelancersListService } from '../services/freelancers-list.service';

@Injectable()

export class CategoryResolver implements Resolve<any> {
  category: string;
  constructor(
    private aPiService: FreelancersListService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params);
    this.aPiService.getCategoriesList(route.params.category)
    .subscribe(data =>{
      //this data = observablecategory
    });
  }
}

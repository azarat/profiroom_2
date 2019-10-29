import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { FreelancersListService } from '../services/freelancers-list.service';
import { GetOffersService } from '../services/get-offers.service';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()

export class OffersResolver implements Resolve<any> {
  // offers: OffersList ;

  constructor(
    private getOffersService: GetOffersService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    const subcategory: string = route.params.subcategorie.split('?' && '%')[0];
    this.getOffersService.setSubcategoryValue(subcategory);
  }
}


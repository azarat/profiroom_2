import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { FreelancersListService } from '../services/freelancers-list.service';
import { GetOffersService } from '../../core/services/get-offers.service';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';


@Injectable()

export class OffersResolver implements Resolve<any> {
  // offers: OffersList ;
  constructor(
    private aPiService: GetOffersService
   ) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.aPiService.getOffers(route.params.subcategorie);
  }
}


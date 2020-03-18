import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';


@Injectable()
export class ServicePageService {

  // // tslint:disable-next-line: variable-name
  // private _similarOffers = new BehaviorSubject(null); // - regexSubj
  // public similarOffers$: Observable<OfferDataInterface>; // - observable

  // tslint:disable-next-line: variable-name
  // public _offerDate = new BehaviorSubject(null);
  // public offerDate$: Observable<OfferDataInterface>;

  // private dealRoom: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) {
    // this.offerDate$ = this._offerDate.asObservable();
    // this.similarOffers$ = this._similarOffers.asObservable();

  }

  loadOfferDate(offerid: object) {
    return this.http.post('/showOffer', offerid);
  }

  getViewedOffers(offersIdArr: string[]) {
    return this.http.post('/visitedOffer', { VisitedOffer: offersIdArr });
  }

  similarOffers(offerid: object) {
    return this.http.post('/simularOffers', offerid);
  }

  public makeDeal(data: object, offer_id) {
    return this.http.post('/makeDeal', data)
    .subscribe((res: any) => {
      console.log(res);
      this.routeToWorkChat(res.dealId, offer_id, res.roomId);
    });
  }

  public createDeal(offerId: number, dealtype) {
    this.http.post('/makeDeal', { offer_id: offerId, package: dealtype })
      .subscribe((res: any) => {
        console.log(res);
        this.routeToWorkChat(res.dealId, offerId, res.roomId);
      });
  }
  // Navigate to work chat vs querry params to open this deal as active
  public routeToWorkChat(dealRoomId: number, _offerId: number, _roomId: string) {
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    console.log('event')
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: { id: dealRoomId, offers_id: _offerId, breef: 0, roomId: _roomId },
    });
  }
}

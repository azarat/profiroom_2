import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';


@Injectable()
export class ServicePageService {

  // tslint:disable-next-line: variable-name
  private _viewedOffers = new BehaviorSubject(null); // - regexSubj
  public viewedOffers$: Observable<OfferDataInterface>; // - observable

  // tslint:disable-next-line: variable-name
  public _offerDate = new BehaviorSubject(null);
  public offerDate$: Observable<OfferDataInterface>;

  constructor(
    private http: HttpClient
  ) {
    this.offerDate$ = this._offerDate.asObservable();
    this.viewedOffers$ = this._viewedOffers.asObservable();
   }

  loadOfferDate(offerid: object) {
    return this.http.post('/showOffer', offerid);
  }

  getViewedOffers(offersIdArr: []) {

    const arrToString = offersIdArr.filter(x => x);
    return this.http.post('/visitedOffer', { VisitedOffer: arrToString })
      // .subscribe(res => {
      //   this._viewedOffers.next(res[0]);
      //   console.log(1);
      //   console.log('viwed', res);
      // });

  }
}

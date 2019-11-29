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
  ) { }

  loadOfferDate(offerid: object) {
    return this.http.post('/showOffer', offerid);
  }

  getViewedCars(vinsArr: []) {
    const arrToString = vinsArr.filter(x => x).toString();

    this.http
      .post('/getByVin', { Vin: arrToString })
      .subscribe(res => {
        this._viewedOffers.next(res[0]);
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';


@Injectable()
export class ServicePageService {

  public id;

  // tslint:disable-next-line: variable-name
  public _offerDate = new BehaviorSubject(null);
  public offerDate$: Observable<OfferDataInterface>;

  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: variable-name
  ) {
    this.offerDate$ = this._offerDate.asObservable();
   }

  loadOfferDate(offerid) {
    this.id = {
      offerId: offerid
    };

    this.http.post('/showOffer', this.id).subscribe((res: OfferDataInterface) => {
      this._offerDate.next(res);
    });
  }
}

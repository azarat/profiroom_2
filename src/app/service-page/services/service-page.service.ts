import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferDateInterface } from 'src/app/shared/interfaces/offer-date.interface';


@Injectable()
export class ServicePageService {

  public id;

  public _offerDate = new BehaviorSubject(null);
  public offerDate: Observable<OfferDateInterface>;

  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: variable-name
  ) {
    this.offerDate = this._offerDate.asObservable();
   }

  loadOfferDate(offerid) {

    console.log("its Alivve")
    this.id = {
      offerId: offerid
    };

    this.http.post('/showOffer', this.id).subscribe((res: OfferDateInterface) => {
      this._offerDate.next(res);
    });
  }
}

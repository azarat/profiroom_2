import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollocutorInterface } from '../interfaces/collocutor.interface';

@Injectable({
  providedIn: 'root'
})

export class DealService {

  // dealData: CollocutorListInterface;
  // tslint:disable-next-line:variable-name
  private _dealData = new BehaviorSubject(null);
  public dealData$ = new Observable<CollocutorInterface>();

  constructor(
    private http: HttpClient
  ) {
    this.dealData$ = this._dealData.asObservable();
  }

  setDealInfo(deal: CollocutorInterface) {
    this._dealData.next(deal);
  }

  public setDealRate(rateData, type) {
    // Deal -> freelancer // Customer for customer
    return this.http.post('/send' + type + 'Comment', rateData);
  }
  // public setCustomerRate(rateData) {
  //   return this.http.post('/sendCustomerComment', rateData);
  // }

  public callToArbiter(id: number) {
    return this.http.post('/callArbiter', { deal_id: id });
  }
}

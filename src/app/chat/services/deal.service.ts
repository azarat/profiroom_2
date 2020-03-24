import { Injectable } from '@angular/core';
import { CollucutorsListInterface } from '../interfaces/collucotors-list.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DealService {

  // dealData: CollucutorsListInterface;
  // tslint:disable-next-line:variable-name
  private _dealData = new BehaviorSubject(null);
  public dealData$ = new Observable<CollucutorsListInterface>();

  constructor(
    private http: HttpClient
  ) {
    this.dealData$ = this._dealData.asObservable();
  }

  setDealInfo(deal: CollucutorsListInterface) {
    this._dealData.next(deal);
  }

  public setDealRate(rateData, type) {
    // Deal -> freelancer // Customer for customer
    return this.http.post('/send' + type + 'Comment', rateData);
  }
  // public setСustomerRate(rateData) {
  //   return this.http.post('/sendCustomerComment', rateData);
  // }


}

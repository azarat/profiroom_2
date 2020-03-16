import { Injectable } from "@angular/core";
import { CollucutorsListInterface } from '../interfaces/collucotors-list.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DealService {

  // dealData: CollucutorsListInterface;
  private _dealData = new BehaviorSubject(null);
  public dealData$ = new Observable<CollucutorsListInterface>();

  constructor() {
    this.dealData$ = this._dealData.asObservable();
  }

  setDealInfo(deal: CollucutorsListInterface) {
    this._dealData.next(deal);
  }


}

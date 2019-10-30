import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class UserOffersService {

  private userOffer = new BehaviorSubject(null);
  public userOffer$ = this.userOffer.asObservable();

  constructor(
    private http: HttpClient
  ) { }

 public getCategorys() {
    return this.http.get<any>('/categories');
  }

  public showUserServices() {
    return this.http.get('/userOffers');
  }

  public serviceCreation(offerData) {
    return this.http.post<any>('/newoffer', offerData);
  }

  public changeUserService(offerId) {
    return this.http.post('/getOffer', offerId)
    .subscribe(
      res => {
        this.userOffer.next(res);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as WayforPay from 'src/app/core/payments-js/wayforpay';
declare var Wayforpay: any;

@Injectable({
  providedIn: 'root'
})

export class UserFinanceService {

  wayforpay = new Wayforpay();

  constructor(
    private http: HttpClient,
  ) { }


  public getUserFinanceData() {
    return this.http.get('/userFinance');
  }

  public makePayment(userData) {
    this.http.post('/Purchase', userData)
    .subscribe((res: any) => {
     this.ranWFP( res.responce);
    })
  }

  ranWFP(obj) {
    this.wayforpay.run(obj);
  }
}

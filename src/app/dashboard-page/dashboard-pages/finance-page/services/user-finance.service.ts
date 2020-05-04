import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as WayforPay from 'src/app/core/payments-js/wayforpay';
// declare var Wayforpay: any;
declare var LiqPayCheckout : any;
@Injectable({
  providedIn: 'root'
})

export class UserFinanceService {



  constructor(
    private http: HttpClient,
  ) { }


  public getUserFinanceData() {
    return this.http.get('/userFinance');
  }

  public makePayment(userData) {
    console.log(userData)
    this.http.post('/payment', userData)
    .subscribe((res: any) => {
      console.log(res)
    this.ranLiqPay(res);
    })
  }

  private ranLiqPay(res) {
    LiqPayCheckout.init({
      data: res.data,
      signature: res.signature,
      embedTo: "#liqpay_checkout",
      language: 'ru',
      mode: "popup"
    }).on("liqpay.callback", function(data) {
      console.log(data.status);
      console.log(data);
    }).on("liqpay.ready", function(){
      console.log('ready')
    }).on("liqpay.close", function(data){
      console.log('close');
    })
  }
}

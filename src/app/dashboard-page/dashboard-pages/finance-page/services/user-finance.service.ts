import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
// import * as WayforPay from 'src/app/core/payments-js/wayforpay';
// declare var Wayforpay: any;
declare var LiqPayCheckout: any;
@Injectable({
  providedIn: 'root'
})

export class UserFinanceService {



  constructor(
    private http: HttpClient,
  ) {}


  public getUserFinanceData() {
    return this.http.get('/userFinance');
  }

  public makePayment(userData) {
    return this.http.post('/payment', userData);
      // .subscribe((res: any) => {
      //   if (res.message === 'fail') {
      //     return res;
      //   } else {
      //     this.ranLiqPay(res);
      //     return true;
      //   }

      // });
  }

  public ranLiqPay(res) {
    LiqPayCheckout.init({
      data: res.data,
      signature: res.signature,
      embedTo: '#liqpay_checkout',
      language: 'ru',
      mode: 'popup'
    }).on('liqpay.callback',  (data)=> {
    }).on('liqpay.ready',  () => {
    }).on('liqpay.close',  (data)=> {
    });
  }
}

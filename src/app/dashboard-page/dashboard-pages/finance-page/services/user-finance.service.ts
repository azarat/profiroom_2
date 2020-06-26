import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { PaymentKonkordInterface } from '../interfaces/payment-konkord.interface';
// import * as WayforPay from 'src/app/core/payments-js/wayforpay';
// declare var Wayforpay: any;
declare var LiqPayCheckout: any;
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
    return this.http.post('/payment', userData)
    .subscribe((res: any) => {
      if (res.message === 'fail') {
      } else {
        this.concordMakePayment(res);
      }

    });


  }

  public concordMakePayment(params) {

    const formData = new FormData();
    Object.keys(params).map((key) => formData.append(key, params[key]));

    // const request = new XMLHttpRequest();
    // request.open('POST', 'https://pay.concord.ua/api/');
    // request.send(formData);
    // request.onload = ( response: any) => {
    //   console.log(response.responseText);
    // };

    this.http.post('https://pay.concord.ua/api/', formData)
    .subscribe((res: any) => {
      console.log(res.url)
      window.open(res.url, '_blank');

    })


    // function updateProgress (oEvent) {
    //   if (oEvent.lengthComputable) {
    //     var percentComplete = oEvent.loaded / oEvent.total;
    //     // ...
    //   } else {
    //     // Невозможно вычислить состояние загрузки, так как размер неизвестен
    //   }
    // }

    // function transferComplete(evt) {
    //   // alert("Загрузка завершена.");
    //   console.log(evt);
    // }

    // function transferFailed(evt) {
    //   // alert("При загрузке файла произошла ошибка.");
    //   console.log(evt);
    // }

    // function transferCanceled(evt) {
    //   // alert("Пользователь отменил загрузку.");
    //   console.log(evt);
    // }



    // const formData = new FormData();
    // formData.append('merchant_id', 'nySPrgd-Yh-u3546cQ1Ai1uHIv2');
    // formData.append('operation', 'Purchase');
    // formData.append('description', 'Пополнение счета в Gigroom');
    // formData.append('amount', params.amount);
    // formData.append('order_id', params.order_id);
    // formData.append('currency_iso', 'UAH');
    // formData.append('signature', params.signature);
    // formData.append('callback_url', 'http://dev.thecubetest.site/Backend/api/concordCallback');
    // formData.append('order_id', params.order_id);
    // formData.append('redirect', 'false');

    // const url = 'https://pay.concord.ua/api/';

    // const request = new XMLHttpRequest();
    // request.open('POST', url + ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime(), true);
    // request.setRequestHeader('Content-Type', 'multipart/form-data');
    // request.onload = () => {
    //   console.log(request); // http://example.com/test
    // };

    // // request.upload.addEventListener('progress', updateProgress, false);
    // // request.upload.addEventListener('load', transferComplete, false);
    // // request.upload.addEventListener('error', transferFailed, false);
    // // request.upload.addEventListener('abort', transferCanceled, false);
    // // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // request.send(formData);

    // for (const key in params) {

    //   if (key === 'merchant_id') {

    //   } else {
    //     formData.append(key, params[key]);
    //   }

    // formData.append('amount', params.amount);
    // formData.append('callback_url', 'http://dev.thecubetest.site/Backend/api/concordCallback');
    // formData.append('currency_iso', 'UAH');
    // formData.append('description', 'Пополнение счета в Gigroom');
    // formData.append('operation', 'Purchase');
    // formData.append('order_id', params.order_id);
    // formData.append('redirect', 'false');
    // formData.append('signature', params.signature);


    // const formData = new FormData();
    // formData.append('merchant_id', 'nySPrgd-Yh-u3546cQ1Ai1uHIv2');
    // console.log('formData', formData);
    // const request = new XMLHttpRequest();

    // request.open('POST', 'https://pay.concord.ua/api/');
    // request.setRequestHeader('Content-Type', 'multipart/form-data');
    // request.onreadystatechange = () => {
    //   if (request.readyState === XMLHttpRequest.DONE) {
    //     console.log(request.responseText);
    //   }
    // }
    // request.send(formData);
    // request.response( res => {
    //   console.log(res);
    // })





    // console.log(formData);
    // const data: Partial<PaymentKonkordInterface> = params;
    // const formData = new FormData();

    // tslint:disable-next-line: forin
    // for ( const key in params ) {

    //   // if(key === 'merchant_id') {
    //   //   console.log('merchant_id', params.merchant_id)
    //   //   formData.append('merchant_id', params.merchant_id);
    //   // } else {
    //     formData.append(key, params[key]);
    //   // }

    // }
    // formData.append('merchant_id', 'nySPrgd-Yh-u3546cQ1Ai1uHIv2');
    // const request = new XMLHttpRequest();

    // request.open('POST', 'https://pay.concord.ua/api/');
    // request.setRequestHeader('Content-Type', 'multipart/form-data')
    // request.send(formData);


    // this.http.post('https://pay.concord.ua/api/', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }


    //   );

    // LiqPayCheckout.init({
    //   data: res.data,
    //   signature: res.signature,
    //   embedTo: '#liqpay_checkout',
    //   language: 'ru',
    //   mode: 'popup'
    // }).on('liqpay.callback',  (data)=> {
    // }).on('liqpay.ready',  () => {
    // }).on('liqpay.close',  (data)=> {
    // });
  }
}

    // public ranLiqPay(res) {
    //   LiqPayCheckout.init({
    //     data: res.data,
    //     signature: res.signature,
    //     embedTo: '#liqpay_checkout',
    //     language: 'ru',
    //     mode: 'popup'
    //   }).on('liqpay.callback',  (data)=> {
    //   }).on('liqpay.ready',  () => {
    //   }).on('liqpay.close',  (data)=> {
    //   });
    // }
  // }

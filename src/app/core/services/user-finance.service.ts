import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

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
    this.http.post('https://pay.concord.ua/api/', formData)
      .subscribe((res: any) => {
        window.open(res.url, '_blank');
      });
  }


  // public getCash(data) {
  //   return this.http.post('/payment')
  // }
}


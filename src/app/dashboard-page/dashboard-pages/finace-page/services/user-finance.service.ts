import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}

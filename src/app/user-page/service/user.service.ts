import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  loadUserDate(userId: object) {
    return this.http.post('/getUser', userId);
  }

  public saveUserWievs(ip, id ) {
    return this.http.post('/updateUserViews', {visitorUniq: ip, userId: id});
  }
}

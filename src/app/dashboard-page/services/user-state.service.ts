import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserStateService {

  // tslint:disable-next-line: variable-name
  private _userState = new BehaviorSubject<any>(null);
  public userState$ = this._userState.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  public setUserState(state: number) {
    this._userState.next(state);
  }

  public toggleUserState() {
    return this.http.get('/changeRole');
  }

}

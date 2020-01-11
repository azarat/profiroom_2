import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()



export class UserService {
  private user = new BehaviorSubject(null);
  public user$: Observable<UserModel>;

    constructor(
        private http: HttpClient,
    ) {
    this.user$ = this.user.asObservable();
    }
    getDashboardRes = () => {
        return this.http.get('/dashboard');
    }
}

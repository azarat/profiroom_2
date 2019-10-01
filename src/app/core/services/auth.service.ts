import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable()

export class AuthService {

  authSubject = new BehaviorSubject(false);
  // tslint:disable-next-line: variable-name
  auth_token: string;

  constructor(
    private http: HttpClient,
  ) {}

  registation(userInputs): Observable<any> {
    return this.http.post<any>('/register', userInputs);
  }

  authenticate(userInputs): Observable<any> {
    // console.log({name: user, password: pass});
    return this.http.post<any>('/login', userInputs);
  }

}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable()

export class AuthService {

  authSubject = new BehaviorSubject(false);
  // tslint:disable-next-line: variable-name
  auth_token: string;

  constructor(
    private http: HttpClient,
  ) {}

  registration = (userInputs: User ): Observable<User> => {
    return this.http.post<User>('', userInputs).pipe(
      tap((res) => {
        this.authSubject.next(true);
      })
    );
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    console.log({name: user, password: pass});
    return this.http.post<any>('/login', {email: user, password: pass}).pipe(
      map(response => {
        console.log(response);
        const r = response.json();
        this.auth_token = r.succes ? r.token : null;
        return r;
      })
    )
  }

}

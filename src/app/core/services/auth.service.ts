import { Injectable } from '@angular/core';
import { AuthInterface } from 'src/app/authorization-page/shared/interfaces/autorization.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()

export class AuthService {

  authSubject = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
  ) {}

  registration = (userInputs: AuthInterface ): Observable<AuthInterface> => {
    return this.http.post<AuthInterface>('', userInputs).pipe(
      tap((res) => {
        this.authSubject.next(true);
      })
    )
  }

}

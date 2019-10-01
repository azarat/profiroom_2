import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { LocalStorageService } from './local-storage.service';

@Injectable()

export class AuthService {

  // authSubject = new BehaviorSubject(false);
  // // tslint:disable-next-line: variable-name
  // auth_token: string;
  private currentUser = new BehaviorSubject(null);
  public currentUser$: Observable<User>;
  private token = new BehaviorSubject(null);
  public token$: Observable<string>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localize: LocalizeRouterService,
    private localService: LocalStorageService

  ) {
    this.currentUser$ = this.currentUser.asObservable();

    this.token = this.localService.getItem('token');
    this.token$ = this.token.asObservable();
  }
  public get currentUserValue(): string {
    return this.token.value;
  }

  registation = (userInputs: User): Observable<any> => {
    return this.http.post<any>('/register', userInputs);
  }

  authenticate = (userInputs: User): Observable<any> => {
    const translatedPath: any = this.localize.translateRoute('/dashboard');
    return this.http.post<any>('/login', userInputs).pipe(
      map(userData => {
        if (userData) {
          this.currentUser.next(userData);
          this.localService.setItem('token', userData.token);
          this.router.navigate([translatedPath]);
        }
        // console.log(userData);
      }),
      catchError(error => {
        return error;
      })
    );
  }

  setUserData = (response: User) => {
    this.currentUser.next(response);
  }
}

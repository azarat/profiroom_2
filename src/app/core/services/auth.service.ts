import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
<<<<<<< HEAD
=======
import { UserModel } from 'src/app/models/user/user.model';
>>>>>>> parent of 518409f... final
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { LocalStorageService } from './local-storage.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()

export class AuthentificationService {

  // authSubject = new BehaviorSubject(false);
  // // tslint:disable-next-line: variable-name
  // auth_token: string;
  private currentUser = new BehaviorSubject(null);
  public currentUser$: Observable<UserModel>;
  private token = new BehaviorSubject(null);
  public token$: Observable<string>;
  user: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localize: LocalizeRouterService,
    private localStorageService: LocalStorageService,
    public  afAuth: AngularFireAuth

  ) {
    // this.currentUser$ = this.currentUser.asObservable();

  }
  // public get currentUserToken(): string | boolean {
  //   return this.token.value;
  // }


  registation = (userInputs: UserModel): Observable<any> => {
    return this.http.post<any>('/register', userInputs);
  }

  authenticate = (userInputs: UserModel): Observable<any> => {
    return this.http.post<any>('/login', userInputs);
  }

  logOut = () => {
    const translatedPath: any = this.localize.translateRoute('/');
    this.localStorageService.removeItem('token');
    this.router.navigate([translatedPath]);
  }

  resetPass = (userInputs: UserModel): Observable<any> => {
     return this.http.post<any>('/password/email', userInputs);
  }

  confirmNewPass = (userInputs: UserModel) => {
    return this.http.post<any>('/password/reset', userInputs);
  }

  // tslint:disable-next-line: variable-name
  verifyEmail(_id, _expires, _signature) {
    return this.http.post<any>('/email/verify', { id: _id, expires: _expires, signature: _signature });
  }
}

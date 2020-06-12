import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Injectable()

export class UserService {
  private user = new BehaviorSubject(null);
  public user$: Observable<UserModel> = this.user.asObservable();

    constructor(
        private http: HttpClient,
    ) {
    // this.user$ = this.user.asObservable();
    }
    public getDashboardRes = (): Observable<any> => {
        return this.http.get('/dashboard');
    }

    public wrightTo(collocutorId: number) {
      return this.http.post('/newChatRoom', {id: collocutorId});
    }

    public getMinUserData() {
      this.http.get('/getUserMinInfo')
      .subscribe((res: any) => {
        this.user.next(res);
      })
    }
}

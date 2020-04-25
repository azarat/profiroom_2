import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollocutorInterface } from '../interfaces/collocutor.interface';

@Injectable({
  providedIn: 'root'
})

export class CollocutorService {
  private _collocutorData = new BehaviorSubject(null);
  public collocutorData$ = new Observable<CollocutorInterface>();

  constructor(
    private http: HttpClient
  ) {
    this.collocutorData$ = this._collocutorData.asObservable();
  }
// Set collocutor Data after reset
  public setCollocutorInfo(deal: CollocutorInterface) {
      this._collocutorData.next(deal);  
  }

  public unsubscribeCollocutorData() {
    this._collocutorData.unsubscribe();
  }
}

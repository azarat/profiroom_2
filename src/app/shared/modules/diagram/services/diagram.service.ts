import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  constructor(
    private http: HttpClient,
  ) { }


  public getYearStatistic(_year: number ) {
    return this.http.post('/userFinanceGraph', {year: _year});
  }
}

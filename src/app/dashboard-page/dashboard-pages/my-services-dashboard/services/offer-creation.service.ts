import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class OfferCreationService {

  constructor(
    private http: HttpClient
  ) { }

  getCategorys() {
    return this.http.get<any>('/categories');
  }

public offerCreation( offerData) {
  return this.http.post<any>('/newoffer', offerData);
}

}

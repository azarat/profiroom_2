import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class UserOffersService {

  // private userOffer = new BehaviorSubject(null);
  // public userOffer$ = this.userOffer.asObservable();

  constructor(
    private http: HttpClient
  ) { }

 public getCategorys() {
    return this.http.get<any>('/categories');
  }

  public showServices() {
    return this.http.get('/userOffers');
  }

  public serviceCreation() {
    return this.http.get<any>('/newOffer');
  }

  public updateService( formData){
    return this.http.post<any>('/updateOffer', formData);
  }
  public deleteService(id) {
    return this.http.delete('/deleteOffer?' + 'offerId=' + id);
  }

  public getServiceData(offerId) {
    return this.http.post('/getOffer', offerId);
  }

  uploadFiles(files){
    return this.http.post('/loadOfferFiles', files);
  }

  deleteFile(id){
    return this.http.post('/deleteOfferFile', id);
  }
}

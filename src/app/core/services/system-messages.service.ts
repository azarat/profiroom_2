import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemMessagesService {

  constructor(
    private http: HttpClient,
  ) { }

  public systemMessagesList(userID) {
    return this.http.post('/systemMessages', {id: userID});
  }
}
